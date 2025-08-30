import WebSocket from "ws";
import { User } from "../types";

export interface UserManager {
    addUser: (user: User) => void;
    getUser: (userId: string) => User | undefined;
    getUserByWs: (ws: WebSocket) => User | undefined;
    removeUser: (userId: string) => void;
    getAllUsers: () => User[];
    getOnlineUsers: () => User[];
}
