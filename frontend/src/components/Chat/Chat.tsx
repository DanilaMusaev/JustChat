import { UseWebSocketContext } from '../../context/WebSocketProvider';
import type { IMessage } from '../../shared/types/types';
import { Message } from '../Message/Message';
import styles from './style.module.css';

type Props = {
    messages?: IMessage[];
};

export const Chat = ({ messages }: Props) => {
    const {currentUser} = UseWebSocketContext();

    return (
        <div className={styles.chatMessages}>
            {!messages || messages.length === 0 ? (
                <div className={styles.noMessages}>Напишите первым!</div>
            ) : (
                messages.map((message) => (
                    <Message
                        key={message.id}
                        text={message.text}
                        isOwn={message.senderId === currentUser?.username}
                        timestamp={message.timestamp}
                    />
                ))
            )}
        </div>
    );
};
