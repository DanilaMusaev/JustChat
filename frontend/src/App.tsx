import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { Auth } from './components/Auth/Auth';
import ChooseMenu from './components/ChooseMenu/ChooseMenu';
import { UseWebSocketContext } from './context/WebSocketProvider';
import ChatBlock from './components/ChatBlock/ChatBlock';

function App() {
    const {
        connect,
        startChat,
        currentUser,
        users,
    } = UseWebSocketContext();
    const [targetUser, setTargetUser] = useState<string | null>(null);

    // Подключение к ws
    useEffect(() => {
        connect();
    }, [connect]);

    const chooseConversationHandler = (targetId: string, username: string) => {
        startChat(targetId);
        setTargetUser(username);
    };

    if (!currentUser) return <Auth />;

    return (
        <div className={styles.appWrapper}>
            {targetUser === null ? (
                <ChooseMenu
                    onlineUsers={users}
                    tempFunc={chooseConversationHandler}
                />
            ) : (
                <ChatBlock />
            )}
        </div>
    );
}

export default App;
