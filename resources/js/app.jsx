import './bootstrap';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react'
import { hydrateRoot } from 'react-dom/client'

window.addEventListener('popstate', (event) => {
    window.location.reload()
});

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        return pages[`./Pages/${name}.jsx`]
    },
    setup({ el, App, props }) {
        hydrateRoot(el, <App {...props} />)
    },
})


