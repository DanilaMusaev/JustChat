import { WebSocketServer } from 'ws';

const PORT = process.env.PORT || 5000;

const wss = new WebSocketServer({
    port: PORT,
});
