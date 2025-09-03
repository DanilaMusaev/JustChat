export interface User {
    id: string;
    username: string;
    status: 'online' | 'offline' | 'away';
}

export interface IMessage {
    id: string;
    text: string;
    senderId: string;
    timestamp: Date;
    status: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
    id: string;
    user1Id: string;
    user2Id: string;
    messages: IMessage[];
    createdAt: Date;
}

export interface WSMessage {
    type: string;
    payload: any;
}

// Типы исходящих сообщений
export interface AuthMessage extends WSMessage {
    type: 'auth';
    payload: { username: string };
}

export interface StartChatMessage extends WSMessage {
    type: 'start_chat';
    payload: { targetUserId: string };
}

export interface TextMessage extends WSMessage {
    type: 'message';
    payload: { conversationId: string; text: string };
}

// Типы входящих сообщений
export interface AuthSuccessMessage extends WSMessage {
    type: 'auth_success';
    payload: { userId: string; username: string };
}

export interface UsersListMessage extends WSMessage {
    type: 'users_list';
    payload: { users: User[] };
}

export interface UserStatusMessage extends WSMessage {
    type: 'user_status';
    payload: { userId: string; username: string; status: string };
}

export interface NewChatNotificationMessage extends WSMessage {
    type: 'new_chat_notification';
    payload: {
        conversationId: string;
        fromUser: { id: string; username: string };
        message: string;
    };
}