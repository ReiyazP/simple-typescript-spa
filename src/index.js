import('./bootstrap.ts')

if (module.hot) {
    module.hot.accept();
    window.addEventListener('message', e => {
        if ('production' !== process.env.NODE_ENV) {
            console.clear();
        }
    });
}