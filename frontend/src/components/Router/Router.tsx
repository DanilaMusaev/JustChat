import { Navigate, Route, Routes } from 'react-router';
import { UseWebSocketContext } from '../../context/WebSocketProvider';
import { ROUTES } from '../../constants/routes';

const AppRouter = () => {
    const { currentUser } = UseWebSocketContext();

    return (
        <Routes>
            {!currentUser ? (
                <>
                    <Route
                        path={ROUTES.base.static.path}
                        element={<ROUTES.base.static.element />}
                    />
                    <Route
                        path={ROUTES.error.static.path}
                        element={<ROUTES.error.static.element />}
                    />
                </>
            ) : (
                <>
                    <Route
                        path={ROUTES.chat.static.path}
                        element={<ROUTES.chat.static.element />}
                    />
                    <Route
                        path={ROUTES.chat.dynamic.path}
                        element={<ROUTES.chat.dynamic.element />}
                    />
                    <Route
                        path={ROUTES.base.static.path}
                        element={<Navigate to={ROUTES.chat.static.path} />}
                    />
                </>
            )}
        </Routes>
    );
};

export default AppRouter;
