import { UseWebSocketContext } from '../../context/WebSocketProvider';
import type { User } from '../../shared/types/types';
import Icon from '../Icon';
import styles from './style.module.css';

interface ChooseMenuProps {
    onlineUsers?: User[];
    tempFunc: (targetId: string, username: string) => void;
}

const ChooseMenu: React.FC<ChooseMenuProps> = ({ onlineUsers, tempFunc }) => {
    const { currentUser } = UseWebSocketContext();

    const userChooseHandler = (id: string, username: string) => {
        console.log(id);
        tempFunc(id, username);
    };

    return (
        <div className={styles.chooseMenu}>
            <h1 className={styles.title}>
                <div className={styles.titleIconWrapper}>
                    <Icon name="choose_users" className={styles.titleIcon} />
                </div>
                <p>
                    {onlineUsers && onlineUsers.length > 1
                        ? `Choose the User you want to chat:`
                        : `No one users online.`}
                </p>
            </h1>
            <div className={styles.chooseList}>
                {!!onlineUsers && onlineUsers.length > 1
                    ? onlineUsers
                          .filter((user) => user.id !== currentUser?.id)
                          .map((user) => (
                              <div
                                  key={`${user.id}`}
                                  className={styles.chooseTab}
                                  onClick={() =>
                                      userChooseHandler(user.id, user.username)
                                  }
                              >
                                  {user.username}
                              </div>
                          ))
                    : `There is no one you can talk to right now, please wait, or try to find someone to talk to again after a while.`}
            </div>
        </div>
    );
};

export default ChooseMenu;
