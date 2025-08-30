import { WSMessage } from '../types';
// Type-Guards для подтверждения типов сообщений

export function isValidMessage(data: any): data is WSMessage {
    return (
        data &&
        typeof data === 'object' &&
        typeof data.type === 'string' &&
        data.payload !== undefined
    );
}

export function isValidAuthMessage(
    message: WSMessage
): message is { type: 'auth'; payload: { username: string } } {
    return (
        message.type === 'auth' &&
        message.payload &&
        typeof message.payload.username === 'string' &&
        message.payload.username.trim().length > 0 &&
        message.payload.username.trim().length <= 20
    );
}

export function isValidStartChatMessage(
    message: WSMessage
): message is { type: 'start_chat'; payload: { targetUserId: string } } {
    return (
        message.type === 'start_chat' &&
        message.payload &&
        typeof message.payload.targetUserId === 'string' &&
        message.payload.targetUserId.length > 0
    );
}

export function isValidTextMessage(message: WSMessage): message is {
    type: 'message';
    payload: { conversationId: string; text: string };
} {
    return (
        message.type === 'message' &&
        message.payload &&
        typeof message.payload.conversationId === 'string' &&
        typeof message.payload.text === 'string' &&
        message.payload.text.trim().length > 0 &&
        message.payload.text.length <= 1000
    );
}

export function sanitizeUsername(username: string): string {
    return username.trim().substring(0, 20);
}

export function sanitizeMessageText(text: string): string {
    return text.trim().substring(0, 1000);
}
