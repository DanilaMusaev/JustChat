export interface MessageType {
    id: string;
    text: string;
    isOwn: boolean;
    timestamp: Date;
    senderName?: string;
}
