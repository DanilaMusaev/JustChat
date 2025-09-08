import { useMemo, useState } from 'react';
import Icon from '../Icon';
import styles from './style.module.css';
import { UseWebSocketContext } from '../../context/WebSocketProvider';

type ChatInputProps = {};

export const ChatInput = ({}: ChatInputProps) => {
    const { sendTextMessage, conversationId } = UseWebSocketContext();
    const [value, setValue] = useState('');
    const btnDisabled = useMemo(() => !value.trim(), [value]);

    const sendMessageHandler = () => {
        if (!!value.trim() && conversationId !== null) {
            sendTextMessage(conversationId, value);
            setValue('');
        }
    };

    return (
        <div className={styles.inputWrapper}>
            <textarea
                className={styles.inputField}
                placeholder="Type your message"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button
                className={styles.sendBtn}
                disabled={btnDisabled}
                onClick={sendMessageHandler}
            >
                <Icon name="send" className={styles.iconSend} />
            </button>
        </div>
    );
};
