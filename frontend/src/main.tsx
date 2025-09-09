import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './css/globals.css';
import './css/icons.css';
import { WebSocketProvider } from './context/WebSocketProvider.tsx';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
    <WebSocketProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </WebSocketProvider>
);
