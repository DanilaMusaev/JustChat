import styles from './style.module.css';

type Props = {};

export const ChatHead = ({}: Props) => {
    return (
        <div className={styles.chatHead}>
            <h1>Chat</h1>
        </div>
    );
};
