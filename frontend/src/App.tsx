import { useEffect } from 'react';
import { UseWebSocketContext } from './context/WebSocketProvider';
import AppRouter from './components/Router/Router';
import styles from './app.module.css';

function App() {
    const { connect } = UseWebSocketContext();

    // Подключение к ws
    useEffect(() => {
        connect();
    }, [connect]);

    return (
        <div className={styles.appWrapper}>
            <AppRouter />
        </div>
    );
}

export default App;
