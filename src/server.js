const api = require('./api');

(async () => {
    try {
        await api();
    } catch (err) {
        console.error(err);
    }
})();
