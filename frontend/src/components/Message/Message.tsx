import styles from './style.module.css';

interface MessageProps {
    text: string;
    isOwn: boolean;
    timestamp: Date;
    senderName?: string;
}

export const Message = ({
    text,
    isOwn,
    timestamp,
    senderName,
}: MessageProps) => {
    return (
        <div
            className={`${styles.message} ${isOwn ? styles.own : styles.other}`}
        >
            {!isOwn && senderName && (
                <div className={styles.senderName}>{senderName}</div>
            )}
            <div className={styles.content}>
                <p className={styles.text}>{text}</p>
                <span className={styles.timestamp}>
                    {timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
            </div>
        </div>
    );
};
