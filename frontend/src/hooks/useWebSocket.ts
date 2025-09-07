import { useState, useRef, useCallback, useEffect } from 'react';
import type { Conversation, User, WSMessage } from '../shared/types/types';
import {
    isAuthSuccessMessage,
    isChatStartedMessage,
    isErrorMessage,
    isMessageSentMessage,
    isNewChatNotificationMessage,
    isNewMessageMessage,
    isUsersListMessage,
} from '../guards/typeGuards';

export const useWebSocket = (url: string) => {
    const [isConnected, setIsConnected] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const ws = useRef<WebSocket | null>(null);

    // Подключение к WebSocket
    const connect = useCallback(() => {
        try {
            ws.current = new WebSocket(url);

            ws.current.onopen = () => {
                setIsConnected(true);
                console.log('Connected to WS server');
            };

            ws.current.onclose = () => {
                setIsConnected(false);
                console.log('Disconnected from WS server');
            };

            ws.current.onerror = (error) => {
                console.error('WS error:', error);
            };

            ws.current.onmessage = (event) => {
                try {
                    const message: WSMessage = JSON.parse(event.data);
                    handleServerMessage(message);
                } catch (error) {
                    console.error('Error parsing message:', error);
                }
            };
        } catch (error) {
            console.error('WebSocket connection failed:', error);
        }
    }, [url]);

    // Отправка сообщения на сервер
    const sendMessage = useCallback((message: WSMessage) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(message));
        } else {
            console.error('WebSocket is not connected');
        }
    }, []);

    // Обработка сообщений от сервера
    const handleServerMessage = useCallback((message: WSMessage) => {
        // Проверки по typeGuard
        if (isAuthSuccessMessage(message)) {
            setCurrentUser({
                id: message.payload.userId,
                username: message.payload.username,
                status: message.payload.status,
            });
            console.log(message);
        } else if (isUsersListMessage(message)) {
            setUsers(message.payload.users);
            console.log(message);
        } else if (isChatStartedMessage(message)) {
            setConversationId(message.payload.conversationId);
            console.log(message);
        } else if (isNewChatNotificationMessage(message)) {
            // Уведомление, что с тобой начали чат. Возможно, будет не нужно
            console.log(message);
        } else if (isNewMessageMessage(message)) {
            // Уведомление, что пришло сообщение
            console.log(message);
        } else if (isMessageSentMessage(message)) {
            // Уведомление, что твое сообщение было доставлено
            console.log(message);
        } else if (isErrorMessage(message)) {
            console.error('Server error:', message.payload.message);
        } else {
            console.warn('Unknown message type:', message.type);
        }
    }, []);

    // Авторизация
    const auth = useCallback(
        (username: string) => {
            sendMessage({
                type: 'auth',
                payload: { username },
            });
        },
        [sendMessage]
    );

    // Начать чат с пользователем
    const startChat = useCallback(
        (targetUserId: string) => {
            sendMessage({
                type: 'start_chat',
                payload: { targetUserId },
            });
        },
        [sendMessage]
    );

    // Отправить текстовое сообщение
    const sendTextMessage = useCallback(
        (conversationId: string, text: string) => {
            sendMessage({
                type: 'message',
                payload: { conversationId, text },
            });
        },
        [sendMessage]
    );

    // Отключение при размонтировании
    useEffect(() => {
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    return {
        isConnected,
        users,
        conversations,
        conversationId,
        currentUser,
        connect,
        auth,
        startChat,
        sendTextMessage,
        sendMessage,
    };
};
