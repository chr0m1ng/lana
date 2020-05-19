const { Schema, SchemaTypes, model } = require('mongoose');

const MODEL_NAME = 'Contact';
const CONTEXT_NAME = 'Context';

const contact_schema = new Schema(
    {
        name: { type: String },
        extras: { type: Object },
        context: { type: SchemaTypes.ObjectId, ref: CONTEXT_NAME }
    },
    {
        timestamps: true
    }
);

module.exports = model(MODEL_NAME, contact_schema);
