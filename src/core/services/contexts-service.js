const { Types } = require('mongoose');
const { context } = require('../schemas');

const VARIABLES_KEY = 'variables';

const createAsync = async (
    id = new Types.ObjectId(),
    variables = {},
    is_holding = false,
    holding_by = null
) => {
    const doc = await context.create({
        _id: id,
        is_holding,
        holding_by,
        variables
    });
    return doc.id;
};

const findByIdAsync = async (id) => {
    return context.findById(id);
};

const getVariablesAsync = async (id) => {
    const context_doc = await findByIdAsync(id);
    return context_doc ? context_doc.variables : {};
};

const getVariableAsync = async (id, name) => {
    const context_doc = await findByIdAsync(id);
    return context_doc.variables[name];
};

const setVariableAsync = async (id, name, value) => {
    let context_doc = await findByIdAsync(id);
    if (!context_doc) {
        context_doc = await createAsync(id);
    }
    context_doc.variables = context_doc.variables || {};
    context_doc.variables[name] = value;
    context_doc.markModified(VARIABLES_KEY);
    await context_doc.save();
    return context_doc;
};

const deleteVariableAsync = async (id, name) => {
    const context_doc = await findByIdAsync(id);
    delete context_doc.variables[name];
    context_doc.markModified(VARIABLES_KEY);
    return context_doc.save();
};

const holdAsync = async (id, holding_by) => {
    let context_doc = await findByIdAsync(id);
    if (!context_doc) {
        context_doc = await createAsync(id, {}, true, holding_by);
    } else {
        context_doc.is_holding = true;
        context_doc.holding_by = holding_by;
        context_doc = await context_doc.save();
    }
    return context_doc;
};

const releaseAsync = async (id) => {
    const context_doc = await findByIdAsync(id);
    if (!context_doc) {
        return null;
    }
    context_doc.is_holding = false;
    context_doc.holding_by = null;
    return context_doc.save();
};

const statusAsync = async (id) => {
    const context_doc = await findByIdAsync(id);
    return {
        is_holding: context_doc.is_holding,
        holding_by: context_doc.holding_by
    };
};

module.exports = {
    createAsync,
    findByIdAsync,
    getVariablesAsync,
    getVariableAsync,
    setVariableAsync,
    deleteVariableAsync,
    holdAsync,
    releaseAsync,
    statusAsync
};
