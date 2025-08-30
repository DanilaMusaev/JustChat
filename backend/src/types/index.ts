import { WebSocket } from 'ws';

export interface User {
    id: string;
    username: string;
    ws: WebSocket;
    status: 'online' | 'offline' | 'away';
    createdAt: Date;
}

export interface Message {
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
    messages: Message[];
    createdAt: Date;
}

export interface WSMessage {
    type: string;
    payload: any;
}

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
