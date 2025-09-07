import { WebSocket } from 'ws';
import { UserManager } from '../interfaces/UserManager';
import { ConversationManager } from '../interfaces/ConversationManager';
import { isValidTextMessage, sanitizeMessageText } from '../utils/validation';
import { Conversation, Message, TextMessage } from '../types';
import { generateMessageId } from '../utils/generateId';

export class MessageHandler {
    constructor(
        private userManager: UserManager,
        private conversationManager: ConversationManager
    ) {}

    handleMessage(ws: WebSocket, message: TextMessage): void {
        if (!isValidTextMessage(message)) {
            this.sendError(ws, 'Invalid message format');
            return;
        }
        // Ищем пользователя
        const currentUser = this.userManager.getUserByWs(ws);
        if (!currentUser) {
            this.sendError(ws, 'User not authenticated');
            return;
        }

        const { conversationId, text } = message.payload;
        const sanitizedText = sanitizeMessageText(text);
        // Проверяем, что чат есть
        const conversation =
            this.conversationManager.getConversation(conversationId);
        if (!conversation) {
            this.sendError(ws, 'Conversation not found');
            return;
        }
        // Проверяем, что пользователь действительно является участников чата
        if (
            conversation.user1Id !== currentUser.id &&
            conversation.user2Id !== currentUser.id
        ) {
            this.sendError(ws, 'Access denied');
            return;
        }
        // Формируем сообщение
        const newMessage: Message = {
            id: generateMessageId(),
            text: sanitizedText,
            senderId: currentUser.id,
            timestamp: new Date(),
            status: 'sent',
        };
        // Добавляем его в чат
        this.conversationManager.addMessageToConversation(
            conversationId,
            newMessage
        );
        // Отправителю шлем, что сообщение оправлено
        ws.send(
            JSON.stringify({
                type: 'message_sent',
                payload: {
                    message: newMessage,
                    conversationId,
                },
            })
        );

        // Отправляем сообщение другому участнику чата
        this.sendMessageToOtherParticipant(conversation, currentUser.id, newMessage);
    }

    // Метод отправки сообщения другому пользователю чата
    private sendMessageToOtherParticipant(
        conversation: Conversation,
        senderId: string,
        message: Message
    ): void {
        // Определяем id получателя сообщения
        const recipientId =
            conversation.user1Id === senderId
                ? conversation.user2Id
                : conversation.user1Id;
        // Находим получателя по id и проверяем что он есть + онлайн
        const recipient = this.userManager.getUser(recipientId);
        if (!recipient || recipient.status !== 'online') {
            return;
        }
        // Отправляем ему уведомление, что ему прислали сообщение
        recipient.ws.send(
            JSON.stringify({
                type: 'new_message',
                payload: {
                    message,
                    conversationId: conversation.id,
                    from:
                        this.userManager.getUser(senderId)?.username ||
                        'Unknown user',
                },
            })
        );
    }

    private sendError(ws: WebSocket, message: string): void {
        ws.send(
            JSON.stringify({
                type: 'error',
                payload: { message },
            })
        );
    }
}
