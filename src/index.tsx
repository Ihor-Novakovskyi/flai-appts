import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ChatApp from './App';
import { QueryClientProvider,QueryClient } from 'react-query';
const client = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <QueryClientProvider client={client}>
        <ChatApp/>
    </QueryClientProvider>
)
