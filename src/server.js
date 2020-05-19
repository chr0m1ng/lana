const Api = require('./api');

(async () => {
    const api = new Api();
    await api.buildAsync();
    api.start();
})();
