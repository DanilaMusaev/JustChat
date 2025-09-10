import { useNavigate } from 'react-router';
import styles from './style.module.css';
import { ROUTES } from '../../constants/routes';
import Icon from '../Icon';

const NotFound: React.FC = () => {
    const navigation = useNavigate();

    const backBtnHandlers = () => {
        navigation(ROUTES.base.static.path);
    };

    return (
        <div className={styles.notFound}>
            <div className={styles.content}>
                <h1>Error 404</h1>
                <p>The page you are looking for does not exist.</p>
                <button onClick={backBtnHandlers}>
                    <Icon name='arrow_right'/>
                    Back to the auth</button>
            </div>
        </div>
    );
};

export default NotFound;
