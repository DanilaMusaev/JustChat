import { useNavigate } from 'react-router';
import { UseWebSocketContext } from '../../context/WebSocketProvider';
import Icon from '../Icon';
import styles from './style.module.css';
import { ROUTES } from '../../constants/routes';

const ChooseMenu: React.FC = () => {
    const { currentUser, users } = UseWebSocketContext();
    const navigation = useNavigate();

    const userChooseHandler = (id: string) => {
        console.log(id);
        navigation(ROUTES.chat.dynamic.getLink(id));
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
                                      userChooseHandler(user.id)
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
