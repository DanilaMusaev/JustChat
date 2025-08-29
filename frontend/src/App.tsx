import { useState } from 'react';
import styles from './app.module.css';
import { Chat } from './components/Chat/Chat';
import { ChatHead } from './components/ChatHead/ChatHead';
import { ChatInput } from './components/ChatInput/ChatInput';
import { Auth } from './components/Auth/Auth';

function App() {
    const [currentUsername, setCurrentUsername] = useState<string | null>(null);
    const mockMessages = [
        {
            id: '1',
            text: 'Привет! Как дела?',
            isOwn: false,
            timestamp: new Date(Date.now() - 1000000),
            senderName: 'Друг',
        },
        {
            id: '2',
            text: 'Привет! Всё отлично, спасибо!',
            isOwn: true,
            timestamp: new Date(Date.now() - 500000),
        },
        {
            id: '3',
            text: 'Отлично! Что нового?',
            isOwn: false,
            timestamp: new Date(),
            senderName: 'Друг',
        },
    ];

    if (!currentUsername) return <Auth onLogin={setCurrentUsername} />;

    return (
        <div className={styles.appWrapper}>
            <div className={styles.chatBlock}>
                <ChatHead />
                <Chat messages={mockMessages} />
                <ChatInput />
            </div>
        </div>
    );
}

export default App;
