import { UseWebSocketContext } from '../../context/WebSocketProvider';
import Icon from '../Icon';
import styles from './style.module.css';

interface ChooseMenuProps {
    tempFunc: (targetId: string, username: string) => void;
}

const ChooseMenu: React.FC<ChooseMenuProps> = ({ tempFunc }) => {
    const { currentUser, users, startChat } = UseWebSocketContext();

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
                    {users && users.length > 1
                        ? `Choose the User you want to chat:`
                        : `No one users online.`}
                </p>
            </h1>
            <div className={styles.chooseList}>
                {!!users && users.length > 1
                    ? users
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
