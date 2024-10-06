import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { App } from './app';
// import { App } from './App';
import '../src/styles/base.scss';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('app');
    if (container) {
        createRoot(container).render(
            <BrowserRouter>  {/* Wrap App with BrowserRouter */}
                <App />
            </BrowserRouter>
        );
    } else {
        console.error('Target container is not a DOM element.');
    }
});
