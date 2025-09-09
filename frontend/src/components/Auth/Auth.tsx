import { useState } from 'react';
import { UseWebSocketContext } from '../../context/WebSocketProvider';
import styles from './style.module.css';
import Icon from '../Icon';

export const Auth: React.FC = () => {
    const {auth} = UseWebSocketContext();
    const [username, setUsername] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            auth(username.trim());
        }
    };

    return (
        <div className={styles.authOverlay}>
            <div className={styles.authModal}>
                <div className={styles.logo}>
                    <Icon name="auth_logo" />
                </div>

                <h1 className={styles.title}>Welcome to OnyxChat</h1>
                <p className={styles.subtitle}>
                    Enter your name to start chatting.
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div
                        className={`${styles.inputContainer} ${
                            isFocused ? styles.focused : ''
                        }`}
                    >
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="Your name"
                            className={styles.input}
                            maxLength={20}
                            autoFocus
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!username.trim()}
                        className={styles.submitButton}
                    >
                        Enter the chat
                        <Icon name="auth_enter" className={styles.enterIcon} />
                    </button>
                </form>

                <div className={styles.footer}>
                    <span className={styles.hint}>Max 20 symbols</span>
                </div>
            </div>
        </div>
    );
};
