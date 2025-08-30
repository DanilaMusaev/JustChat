import { WebSocket, WebSocketServer } from 'ws';
import { UserFieldManager } from './services/UserFieldManager';
import { ConversationFieldManager } from './services/ConversationFieldManager';
import { AuthHandler } from './handlers/authHandler';
import { ChatHandler } from './handlers/chatHadler';
import { MessageHandler } from './handlers/messageHandler';
import { AuthMessage, StartChatMessage, TextMessage, WSMessage } from './types';

const PORT = Number(process.env.PORT) || 5000;

const wss = new WebSocketServer(
    {
        port: PORT,
    },
    () => console.log(`WebSocket server start on Port: ${PORT}`)
);

// Объявляем все менеджеры
const userManager = new UserFieldManager();
const conversationManager = new ConversationFieldManager();
// Также хенлеры и инжектим в них зависимости
const authHandler = new AuthHandler(userManager);
const chatHandler = new ChatHandler(userManager, conversationManager);
const messageHandler = new MessageHandler(userManager, conversationManager);

function handleMessage(ws: WebSocket, message: WSMessage): void {
    switch (message.type) {
        case 'auth':
            authHandler.handleAuth(ws, message as AuthMessage);
            break;
        case 'start_chat':
            chatHandler.handleStartChat(ws, message as StartChatMessage);
            break;
        case 'message':
            messageHandler.handleMessage(ws, message as TextMessage);
            break;
        default:
            ws.send(
                JSON.stringify({
                    type: 'error',
                    payload: { message: 'Unknown message type' },
                })
            );
    }
}

wss.on('connection', (ws) => {
    console.log('New client connection');

    ws.on('message', (data) => {
        try {
            const message: WSMessage = JSON.parse(data.toString());
            handleMessage(ws, message);
        } catch (error) {
            console.error('Message parsing error', error);
            ws.send(
                JSON.stringify({
                    type: 'error',
                    payload: { message: 'Invalid message format' },
                })
            );
        }
    });

    ws.on('close', () => {
        const user = userManager.getUserByWs(ws);
        if (user) {
            user.status = 'offline';
            console.log(`User ${user.username} disconnected`);
        }
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        const user = userManager.getUserByWs(ws);
        if (user) {
            user.status = 'offline';
        }
    });
});
