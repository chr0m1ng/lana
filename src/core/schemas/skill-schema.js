const { Schema, model } = require('mongoose');

const MODEL_NAME = 'Skill';

const skill_schema = new Schema(
    {
        domain: { type: String, required: true },
        intents: { type: [String], required: true }
    },
    {
        timestamps: true
    }
);

module.exports = model(MODEL_NAME, skill_schema);
