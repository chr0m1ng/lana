const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contact_model = {
    identity = String,
    name = String,
    extras = Object
};

const contact = new Schema(contact_model);

contact.statics.find_by_identity = function(identity) {
    return this.find({identity: new RegExp(identity, 'i')});
};

module.exports = contact;
