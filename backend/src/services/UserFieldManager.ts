import { WebSocket } from 'ws';
import { User } from '../types';
import { UserManager } from '../interfaces/UserManager';

// Класс для работы с пользователями
// Данные в виде полей класса, после желательно перенести в Redis/DB
export class UserFieldManager implements UserManager {
    // Map с пользователями по ключу
    private users: Map<string, User> = new Map();
    // Map с WS пользователей и связь с их id
    private wsToUserId: Map<WebSocket, string> = new Map();

    addUser(user: User): void {
        this.users.set(user.id, user);
        this.wsToUserId.set(user.ws, user.id);
    }

    getUser(userId: string): User | undefined {
        return this.users.get(userId);
    }

    getUserByWs(ws: WebSocket): User | undefined {
        const userId = this.wsToUserId.get(ws);
        return userId ? this.users.get(userId) : undefined;
    }

    removeUser(userId: string): void {
        const user = this.users.get(userId);
        if (user) {
            this.wsToUserId.delete(user.ws);
            this.users.delete(userId);
        }
    }

    getAllUsers(): User[] {
        return Array.from(this.users.values());
    }

    getOnlineUsers(): User[] {
        return this.getAllUsers().filter((user) => user.status === 'online');
    }
}
