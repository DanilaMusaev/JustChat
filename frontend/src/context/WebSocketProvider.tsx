import { createContext, useContext } from 'react';
import type { Conversation, User } from '../shared/types/types';
import { useWebSocket } from '../hooks/useWebSocket';

interface WebSocketContextType {
    isConnected: boolean;
    users: User[];
    conversations: Conversation[];
    conversationId: string | null;
    currentUser: User | null;
    connect: () => void;
    auth: (username: string) => void;
    startChat: (targetUserId: string) => void;
    sendTextMessage: (conversationId: string, text: string) => void;
    clearConversationId: () => void;
}

const WS_URL = import.meta.env.VITE_WS_HOST || 'ws://localhost:5000';

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const webSocket = useWebSocket(WS_URL);

    return (
        <WebSocketContext.Provider value={webSocket}>
            {children}
        </WebSocketContext.Provider>
    );
};

export function UseWebSocketContext() {
    const context = useContext(WebSocketContext);

    if (!context) {
        throw new Error(
            `UseWebSocketContext must be used with WebSocketProvider!`
        );
    }

    return context;
}
