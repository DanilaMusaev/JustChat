import { ConversationManager } from '../interfaces/ConversationManager';
import { Conversation, Message } from '../types';
import { generateConversationId } from '../utils/generateId';

// Класс для обработки чатов пользователей
// Здесь данные в виде полей класса
export class ConversationFieldManager implements ConversationManager {
    private conversations: Map<string, Conversation> = new Map();
    private userConversations: Map<string, Set<string>> = new Map();

    findOrCreateConversation(userId1: string, userId2: string): Conversation {
        // generateConversationId всегда вернет один и тот же id для двух id пользователя, поэтому можно использовать для проверки
        const conversationId = generateConversationId(userId1, userId2);
        // Проверяем есть ли уже такой чат, если нет, создаем новый
        let conversation = this.conversations.get(conversationId);
        if (!conversation) {
            conversation = {
                id: conversationId,
                user1Id: userId1,
                user2Id: userId2,
                messages: [],
                createdAt: new Date(),
            };

            this.conversations.set(conversationId, conversation);
            this.addConversationToUser(userId1, conversationId);
            this.addConversationToUser(userId2, conversationId);
        }

        return conversation;
    }

    getConversation(conversationId: string): Conversation | undefined {
        return this.conversations.get(conversationId);
    }

    addMessageToConversation(
        conversationId: string,
        message: Message
    ): boolean {
        const conversation = this.conversations.get(conversationId);
        if (!conversation) return false; // Если чата нет, то false
        conversation.messages.push(message); // Если есть, тогда добавляем сообщение и возврат true
        return true;
    }

    getUserConversations(userId: string): Conversation[] {
        const conversationIds = this.userConversations.get(userId);
        if (!conversationIds) return [];

        // Проходимся по Set из строк(convId), по ним ищем чаты.
        return Array.from(conversationIds)
            .map((id) => this.conversations.get(id))
            .filter((conv) => conv !== undefined);
    }

    getConversationWithUser(
        userId: string,
        targetUserId: string
    ): Conversation | undefined {
        const conversationId = generateConversationId(userId, targetUserId);
        return this.conversations.get(conversationId);
    }

    deleteConversation(conversationId: string): boolean {
        const conversation = this.conversations.get(conversationId);
        if (!conversation) return false;

        // Удаляем ссылки у пользователей
        this.removeConversationFromUser(conversation.user1Id, conversationId);
        this.removeConversationFromUser(conversation.user2Id, conversationId);

        // Удаляем сам чат
        this.conversations.delete(conversationId);
        return true;
    }

    private addConversationToUser(
        userId: string,
        conversationId: string
    ): void {
        if (!this.userConversations.has(userId)) {
            this.userConversations.set(userId, new Set());
        }
        this.userConversations.get(userId)!.add(conversationId);
    }

    private removeConversationFromUser(
        userId: string,
        conversationId: string
    ): void {
        // Все чаты пользователя
        const userConvs = this.userConversations.get(userId);
        if (userConvs) {
            userConvs.delete(conversationId);
            // Если после удаления чата у пользователя больше нет других чатов, тогда его можно удалить из Map. Шоб места не занимал
            if (userConvs.size === 0) {
                this.userConversations.delete(userId);
            }
        }
    }

    // Очистка старых чатов
    cleanupOldConversations(maxAgeHours: number = 24): number {
        const now = Date.now();
        let deletedCount = 0;

        for (const [conversationId, conversation] of this.conversations) {
            const conversationAge = now - conversation.createdAt.getTime();
            const maxAgeMs = maxAgeHours * 60 * 60 * 1000; // Переводим в мс
            // Если возраст переписки больше чем получившейся maxAgeMs и там нет сообщений - удаляем
            if (
                conversationAge > maxAgeMs &&
                conversation.messages.length === 0
            ) {
                this.deleteConversation(conversationId);
                deletedCount++;
            }
        }

        return deletedCount;
    }
}
