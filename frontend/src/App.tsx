import { useState } from 'react';
import styles from './app.module.css';
import { Chat } from './components/Chat/Chat';
import { ChatHead } from './components/ChatHead/ChatHead';
import { ChatInput } from './components/ChatInput/ChatInput';
import { Auth } from './components/Auth/Auth';
import type { IMessage } from './shared/types/types';

function App() {
    const [currentUsername, setCurrentUsername] = useState<string | null>(null);
    const mockMessages: IMessage[] = [
        {
            id: '1',
            text: 'Привет! Как дела?',
            senderId: 'nonUser',
            timestamp: new Date(Date.now() - 1000000),
            status: 'read',
        },
        {
            id: '2',
            text: 'Привет! Всё отлично, спасибо!',
            senderId: 'userId',
            timestamp: new Date(Date.now() - 500000),
            status: 'read',
        },
        {
            id: '3',
            text: 'Отлично! Что нового?',
            senderId: 'nonUser',
            timestamp: new Date(),
            status: 'read',
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
