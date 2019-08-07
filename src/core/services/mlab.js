const { url } = require('../configs/mlab');
const mongoose = require('mongoose');

const LanaDB = class {
    constructor() {
        mongoose.connect(url, { useNewUrlParser: true });
        this.db = mongoose.connection;
        db.on('error', err => {
            throw new Error(err);
        });
        db.once('open', () => {});
    }
};

module.exports = LanaDB;
