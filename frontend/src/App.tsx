import { useEffect, useMemo, useState } from 'react';
import styles from './app.module.css';
import { Chat } from './components/Chat/Chat';
import { ChatHead } from './components/ChatHead/ChatHead';
import { ChatInput } from './components/ChatInput/ChatInput';
import { Auth } from './components/Auth/Auth';
import ChooseMenu from './components/ChooseMenu/ChooseMenu';
import { UseWebSocketContext } from './context/WebSocketProvider';

function App() {
    const {
        connect,
        auth,
        startChat,
        currentUser,
        users,
        conversations,
        conversationId,
    } = UseWebSocketContext();
    const [targetUser, setTargetUser] = useState<string | null>(null);

    // Подключение к ws
    useEffect(() => {
        connect();
    }, [connect]);

    const chatMessages = useMemo(
        () =>
            conversations.find((conv) => conv.id === conversationId)?.messages,
        [conversationId, conversations]
    );

    const loginHandler = (username: string) => {
        auth(username);
    };

    const chooseConversationHandler = (targetId: string, username: string) => {
        startChat(targetId);
        setTargetUser(username);
    };

    if (!currentUser) return <Auth onLogin={loginHandler} />;

    return (
        <div className={styles.appWrapper}>
            {targetUser === null ? (
                <ChooseMenu
                    onlineUsers={users}
                    tempFunc={chooseConversationHandler}
                />
            ) : (
                <div className={styles.chatBlock}>
                    <ChatHead />
                    <Chat messages={chatMessages} />
                    <ChatInput />
                </div>
            )}
        </div>
    );
}

export default App;
