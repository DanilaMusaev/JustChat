import { useNavigate } from 'react-router';
import Icon from '../Icon';
import styles from './style.module.css';
import { ROUTES } from '../../constants/routes';

export const ChatHead: React.FC = () => {
    const navigation = useNavigate();

    const backBtnHandler = () => {
        navigation(ROUTES.chat.static.path);
    };

    return (
        <div className={styles.chatHead}>
            <button className={styles.backBtn} onClick={backBtnHandler}>
                <Icon name="arrow_right" className={styles.arrowIcon} />
            </button>
            <h1>Chat</h1>
        </div>
    );
};
