import { useState } from 'react';
import styles from './style.module.css';

interface AuthProps {
    onLogin: (username: string) => void;
}

export const Auth = ({ onLogin }: AuthProps) => {
    const [username, setUsername] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            onLogin(username.trim());
        }
    };

    return (
        <div className={styles.authOverlay}>
            <div className={styles.authModal}>
                <div className={styles.logo}>
                    <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                    </svg>
                </div>

                <h1 className={styles.title}>Добро пожаловать в чат</h1>
                <p className={styles.subtitle}>
                    Введите ваше имя для начала общения
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
                            placeholder="Ваше имя"
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
                        Войти в чат
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M10 17l5-5-5-5v10z" />
                        </svg>
                    </button>
                </form>

                <div className={styles.footer}>
                    <span className={styles.hint}>Максимум 20 символов</span>
                </div>
            </div>
        </div>
    );
};
