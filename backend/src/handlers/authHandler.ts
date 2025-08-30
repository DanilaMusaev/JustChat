import { WebSocket } from 'ws';
import { UserManager } from '../interfaces/UserManager';
import { AuthMessage, User } from '../types';
import { generateId } from '../utils/generateId';

// Класс обрабатывающий подключение нового пользователя
export class AuthHandler {
    constructor(private userManager: UserManager) {}

    handleAuth(ws: WebSocket, message: AuthMessage): void {
        const { username } = message.payload;
        // Если username не подходит или его нет - отправляем сообщение с ошибкой
        if (!username || username.trim().length === 0) {
            ws.send(
                JSON.stringify({
                    type: 'auth_error',
                    payload: { message: 'Username is required' },
                })
            );
            return;
        }

        // Генерация и создание пользователя
        const userId = generateId();
        const user: User = {
            id: userId,
            username: username.trim(),
            ws,
            status: 'online',
            createdAt: new Date(),
        };
        this.userManager.addUser(user);

        ws.send(
            JSON.stringify({
                type: 'auth__success',
                payload: { userId, username: user.username },
            })
        );
        // Отсылаем список всех пользователей, которые сейчас онлайн
        this.sendUsersList(ws);
    }

    private sendUsersList(ws: WebSocket): void {
        // Находим все пользователей, которые сейчас онлайн
        const users = this.userManager.getOnlineUsers().map((user) => ({
            id: user.id,
            username: user.username,
            status: user.status,
        }));
        // Отправка всех онлайн пользователей подключившемуся
        ws.send(
            JSON.stringify({
                type: 'users_list',
                payload: { users },
            })
        );
    }
}
