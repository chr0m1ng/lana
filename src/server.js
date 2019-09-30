const api = require('./api');

(async _ => {
    try {
        await api();
    } catch (err) {
        console.error(err);
    }
})();
