import { Route, Routes } from 'react-router';
import { ROUTES } from '../../constants/routes';

const AppRouter = () => {
    return (
        <Routes>
            <Route
                path={ROUTES.base.static.path}
                element={<ROUTES.base.static.element />}
            />
        </Routes>
    );
};

export default AppRouter;
