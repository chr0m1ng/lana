const { Schema, model } = require('mongoose');

const MODEL_NAME = 'Context';

const context_schema = new Schema(
    {
        is_holding: { type: Boolean, required: true },
        holding_by: { type: String, required: false },
        variables: { type: Object }
    },
    {
        timestamps: true
    }
);

module.exports = model(MODEL_NAME, context_schema);
