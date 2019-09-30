const mongoose = require('mongoose');
const model_name = 'Context';

const context_schema = new mongoose.Schema(
    {
        is_holding: { type: Boolean, required: true },
        holding_by: { type: String, required: false },
        variables: { type: Object }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(model_name, context_schema);
