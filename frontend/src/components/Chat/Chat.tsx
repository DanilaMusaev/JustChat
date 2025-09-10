import { useEffect, useRef } from 'react';
import { UseWebSocketContext } from '../../context/WebSocketProvider';
import type { IMessage } from '../../shared/types/types';
import { Message } from '../Message/Message';
import styles from './style.module.css';

type Props = {
    messages?: IMessage[];
};

export const Chat = ({ messages }: Props) => {
    const { currentUser } = UseWebSocketContext();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Автопрокрутка при получении/отправки сообщения
    const scrollChat = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        scrollChat();
    }, [messages]);

    return (
        <div className={styles.chatMessages}>
            <div className={styles.chatMessagesWrapper}>
                {!messages || messages.length === 0 ? (
                    <div className={styles.noMessages}>Write first!</div>
                ) : (
                    messages.map((message) => (
                        <Message
                            key={message.id}
                            text={message.text}
                            isOwn={message.senderId === currentUser?.id}
                            timestamp={message.timestamp}
                        />
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};
