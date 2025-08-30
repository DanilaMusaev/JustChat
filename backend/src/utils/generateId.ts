export function generateId(): string {
    return Math.random().toString(36).slice(2, 11);
}

export function generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function generateConversationId(
    userId1: string,
    userId2: string
): string {
    return `conv_${[userId1, userId2].sort().join('_')}`;
}
