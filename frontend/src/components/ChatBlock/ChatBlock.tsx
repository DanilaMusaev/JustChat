import { useEffect, useMemo } from 'react';
import { UseWebSocketContext } from '../../context/WebSocketProvider';
import { Chat } from '../Chat/Chat';
import { ChatHead } from '../ChatHead/ChatHead';
import { ChatInput } from '../ChatInput/ChatInput';
import { useParams } from 'react-router';
import styles from './style.module.css';

const ChatBlock: React.FC = () => {
    const { conversations, conversationId, startChat } = UseWebSocketContext();
    const params = useParams();

    useEffect(() => {
        if (!!params.targetId) {
            startChat(params.targetId);
        }
    }, [params.targetId]);

    const chatMessages = useMemo(
        () =>
            conversations.find((conv) => conv.id === conversationId)?.messages,
        [conversationId, conversations]
    );

    return (
        <div className={styles.chatBlock}>
            <ChatHead />
            <Chat messages={chatMessages} />
            <ChatInput />
        </div>
    );
};

export default ChatBlock;
