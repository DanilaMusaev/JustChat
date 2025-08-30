import { Conversation, Message } from '../types';

export interface ConversationManager {
    findOrCreateConversation: (
        userId1: string,
        userId2: string
    ) => Conversation;
    getConversation: (conversationId: string) => Conversation | undefined;
    addMessageToConversation: (
        conversationId: string,
        message: Message
    ) => boolean;
    getUserConversations: (userId: string) => Conversation[];
    getConversationWithUser: (
        userId: string,
        targetUserId: string
    ) => Conversation | undefined;
    deleteConversation: (conversationId: string) => boolean;
    cleanupOldConversations: (maxAgeHours: number) => number;
}
