import { useState, useRef, useCallback, useEffect } from 'react';
import type { Conversation, User, WSMessage } from '../shared/types/types';

export const useWebSocket = (url: string) => {
    const [isConnected, setIsConnected] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [conversations, __] = useState<Conversation[]>([]);
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
        switch (message.type) {
            case 'auth_success':
                setCurrentUser(message.payload);
                break;

            case 'users_list':
                setUsers(message.payload.users);
                break;

            case 'chat_started':
                // Начали чат
                break;

            case 'new_chat_notification':
                // Уведомление, что с тобой начали чат. Возможно, будет не нужно
                break;

            case 'new_message':
                // Пришло новое сообщение
                break;

            case 'message_sent':
                // Ответ от сервака, что сообщение было отправлено
                break;

            case 'error':
                console.error('Server error:', message.payload.message);
                break;

            default:
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
        currentUser,
        connect,
        auth,
        startChat,
        sendTextMessage,
        sendMessage,
    };
};
