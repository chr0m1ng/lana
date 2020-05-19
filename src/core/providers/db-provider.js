const sleep = require('util').promisify(setTimeout);
const { connect, connection } = require('mongoose');
const { db } = require('../../config');

const CONNECTED = 1;
const DISCONNECTED = 0;

let instance = null;

class Mongo {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    isConnected() {
        while (![CONNECTED, DISCONNECTED].includes(connection.readyState)) {
            sleep(1000);
        }
        return connection.readyState === CONNECTED;
    }

    async _setupAsync() {
        await connect(db.url, {
            user: db.user,
            pass: db.pass,
            dbName: db.db_name,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            keepAlive: true,
            keepAliveInitialDelay: 300000
        });
    }

    async setupAsync() {
        if (!this.isConnected()) {
            await this._setupAsync();
        }
    }

    async stopAsync() {
        await connection.disconnect();
    }
}

module.exports = Mongo;
