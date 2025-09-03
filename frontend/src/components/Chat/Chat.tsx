import type { IMessage } from '../../shared/types/types';
import { Message } from '../Message/Message';
import styles from './style.module.css';

type Props = {
    messages?: IMessage[];
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
                        isOwn={message.senderId === 'userId'}
                        timestamp={message.timestamp}
                    />
                ))
            )}
        </div>
    );
};
