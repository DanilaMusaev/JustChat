import type { MessageType } from '../../shared/types/message.interface';
import { Message } from '../Message/Message';
import styles from './style.module.css';

type Props = {
    messages?: MessageType[];
};

export const Chat = ({ messages }: Props) => {
    return (
        <div className={styles.chatMessages}>
            {!messages ? (
                <div>Сообщений нет</div>
            ) : (
                messages.map((message) => (
                    <Message
                        key={message.id}
                        text={message.text}
                        isOwn={message.isOwn}
                        timestamp={message.timestamp}
                        senderName={message.senderName}
                    />
                ))
            )}
        </div>
    );
};
