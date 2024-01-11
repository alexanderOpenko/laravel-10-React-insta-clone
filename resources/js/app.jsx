import './bootstrap';
import '../css/app.css';

import { createInertiaApp, router } from '@inertiajs/react'
import { createRoot, hydrateRoot } from 'react-dom/client'

window.addEventListener('popstate', (event) => {
    event.stopImmediatePropagation()
    router.reload()
});

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        return pages[`./Pages/${name}.jsx`]
    },
    setup({ el, App, props }) {
        // createRoot(el).render(<App {...props} />)
        hydrateRoot(el, <App {...props} />)
    },
})

        //ssr command "build": "vite build && vite build --ssr"

