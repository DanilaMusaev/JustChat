import { WebSocket } from 'ws';
import { ConversationManager } from '../interfaces/ConversationManager';
import { UserManager } from '../interfaces/UserManager';
import { StartChatMessage } from '../types';

export class ChatHandler {
    constructor(
        private userManager: UserManager,
        private conversationManager: ConversationManager
    ) {}

    handleStartChat(ws: WebSocket, message: StartChatMessage): void {
        const currentUser = this.userManager.getUserByWs(ws);
        const { targetUserId } = message.payload;
        // Если самого пользователя нет(не авторизован), тогда ошибка
        if (!currentUser) {
            this.sendError(ws, 'User not authenticated');
            return;
        }
        // Если нет пользователя с которым требуется начать чат - ошибка
        const targetUser = this.userManager.getUser(targetUserId);
        if (!targetUser) {
            this.sendError(ws, 'Target user not found');
            return;
        }
        // Если все норм, тогда получаем чат
        const conversation = this.conversationManager.findOrCreateConversation(
            currentUser.id,
            targetUser.id
        );
        // Отправляем подтверждение инициатору чата
        ws.send(
            JSON.stringify({
                type: 'chat_started',
                payload: {
                    conversationId: conversation.id,
                    targetUser: {
                        id: targetUser.id,
                        username: targetUser.username,
                    },
                },
            })
        );
        // Отправляем уведомление пользователю с которым начали чат
        targetUser.ws.send(
            JSON.stringify({
                type: 'new_chat_notification',
                payload: {
                    conversationId: conversation.id,
                    fromUser: {
                        id: currentUser.id,
                        username: currentUser.username,
                    },
                    message: `${currentUser.username} started a chat with you`,
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
