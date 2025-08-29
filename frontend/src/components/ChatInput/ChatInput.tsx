import { useMemo, useState } from 'react';
import Icon from '../Icon';
import styles from './style.module.css';

type Props = {};

export const ChatInput = ({}: Props) => {
    const [value, setValue] = useState('');
    const btnDisabled = useMemo(() => !value.trim(), [value]);

    return (
        <div className={styles.inputWrapper}>
            <textarea
                className={styles.inputField}
                placeholder="Type your message"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button className={styles.sendBtn} disabled={btnDisabled}>
                <Icon name="send" className={styles.iconSend} />
            </button>
        </div>
    );
};
