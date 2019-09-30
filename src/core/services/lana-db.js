const { url } = require('../configs/mlab');
const schemas = require('../schemas');
const mongoose = require('mongoose');

const start = _ => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await mongoose.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            return resolve(db);
        } catch (err) {
            return reject(err);
        }
    });
};

module.exports = { start };
