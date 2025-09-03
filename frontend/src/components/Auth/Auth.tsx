import { useState } from 'react';
import styles from './style.module.css';
import Icon from '../Icon';

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
                    <Icon name="auth_logo" />
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
                        <Icon name="auth_enter" className={styles.enterIcon} />
                    </button>
                </form>

                <div className={styles.footer}>
                    <span className={styles.hint}>Максимум 20 символов</span>
                </div>
            </div>
        </div>
    );
};
