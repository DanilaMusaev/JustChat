import { Auth } from '../components/Auth/Auth';
import ChatBlock from '../components/ChatBlock/ChatBlock';
import ChooseMenu from '../components/ChooseMenu/ChooseMenu';

export const ROUTES = {
    base: {
        static: {
            path: '/',
            element: Auth,
        },
    },
    chat: {
        static: {
            path: '/chats',
            element: ChooseMenu,
        },
        dynamic: {
            path: '/chats/:targetId',
            element: ChatBlock,
        },
    },
};
