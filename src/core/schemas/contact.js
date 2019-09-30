const mongoose = require('mongoose');
const model_name = 'Contact';

const contact_schema = new mongoose.Schema(
    {
        name: { type: String },
        extras: { type: Object },
        context: { type: mongoose.SchemaTypes.ObjectId, ref: 'Context' }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(model_name, contact_schema);
