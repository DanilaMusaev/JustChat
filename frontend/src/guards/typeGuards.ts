// utils/typeGuards.ts
import type {
    WSMessage,
    AuthSuccessMessage,
    UsersListMessage,
    UserStatusMessage,
    NewChatNotificationMessage,
    ChatStartedMessage,
    NewMessageMessage,
    MessageSentMessage,
    ErrorMessage,
} from '../shared/types/types';

export function isAuthSuccessMessage(
    message: WSMessage
): message is AuthSuccessMessage {
    return (
        message.type === 'auth_success' &&
        message.payload &&
        typeof message.payload.userId === 'string' &&
        typeof message.payload.username === 'string'
    );
}

export function isUsersListMessage(
    message: WSMessage
): message is UsersListMessage {
    return (
        message.type === 'users_list' &&
        message.payload &&
        Array.isArray(message.payload.users)
    );
}

export function isUserStatusMessage(
    message: WSMessage
): message is UserStatusMessage {
    return (
        message.type === 'user_status' &&
        message.payload &&
        typeof message.payload.userId === 'string' &&
        typeof message.payload.username === 'string' &&
        typeof message.payload.status === 'string'
    );
}

export function isChatStartedMessage(
    message: WSMessage
): message is ChatStartedMessage {
    return (
        message.type === 'chat_started' &&
        message.payload &&
        typeof message.payload.conversationId === 'string'
    );
}

export function isNewChatNotificationMessage(
    message: WSMessage
): message is NewChatNotificationMessage {
    return (
        message.type === 'new_chat_notification' &&
        message.payload &&
        typeof message.payload.conversationId === 'string' &&
        message.payload.fromUser &&
        typeof message.payload.fromUser.id === 'string' &&
        typeof message.payload.fromUser.username === 'string'
    );
}

export function isNewMessageMessage(
    message: WSMessage
): message is NewMessageMessage {
    return (
        message.type === 'new_message' &&
        message.payload &&
        typeof message.payload.conversationId === 'string' &&
        message.payload.message &&
        typeof message.payload.message.id === 'string' &&
        typeof message.payload.message.text === 'string'
    );
}

export function isMessageSentMessage(
    message: WSMessage
): message is MessageSentMessage {
    return (
        message.type === 'message_sent' &&
        message.payload &&
        typeof message.payload.conversationId === 'string' &&
        message.payload.message &&
        typeof message.payload.message.id === 'string'
    );
}

export function isErrorMessage(message: WSMessage): message is ErrorMessage {
    return (
        message.type === 'error' &&
        message.payload &&
        typeof message.payload.message === 'string'
    );
}
