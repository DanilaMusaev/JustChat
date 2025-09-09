import { useNavigate } from 'react-router';
import styles from './style.module.css';
import { ROUTES } from '../../constants/routes';

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
                <button onClick={backBtnHandlers}>Back to the auth</button>
            </div>
        </div>
    );
};

export default NotFound;
