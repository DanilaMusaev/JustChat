import styles from './style.module.css';

interface MessageProps {
    text: string;
    isOwn: boolean;
    timestamp: Date;
}

export const Message = ({
    text,
    isOwn,
    timestamp,
}: MessageProps) => {
    return (
        <div
            className={`${styles.message} ${isOwn ? styles.own : styles.other}`}
        >
            <div className={styles.content}>
                <p className={styles.text}>{text}</p>
                <span className={styles.timestamp}>
                    {new Date(timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
            </div>
        </div>
    );
};
