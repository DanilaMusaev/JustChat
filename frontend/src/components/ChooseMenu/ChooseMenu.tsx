import type { User } from '../../shared/types/types';
import Icon from '../Icon';
import styles from './style.module.css';

interface ChooseMenuProps {
    onlineUsers: User[];
    tempFunc: (username: string) => void;
}

const ChooseMenu: React.FC<ChooseMenuProps> = ({ onlineUsers, tempFunc }) => {
    const userChooseHandler = (id: string, username: string) => {
        console.log(id);
        tempFunc(username);
    };

    return (
        <div className={styles.chooseMenu}>
            <h1 className={styles.title}>
                <div className={styles.titleIconWrapper}>
                    <Icon name="choose_users" className={styles.titleIcon} />
                </div>
                <p>Choose the User you want to chat:</p>
            </h1>
            <div className={styles.chooseList}>
                {onlineUsers.map((user) => (
                    <div
                        key={`${user.id}`}
                        className={styles.chooseTab}
                        onClick={() =>
                            userChooseHandler(user.id, user.username)
                        }
                    >
                        {user.username}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChooseMenu;
