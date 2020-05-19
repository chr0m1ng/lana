const { Types } = require('mongoose');
const { contact, context } = require('../schemas');
const context_service = require('./contexts');

const EXTRAS_KEY = 'extras';

const createAsync = async (
    id = new Types.ObjectId(),
    name = id,
    extras = {},
    context_id = null
) => {
    const c_id = context_id || (await context_service.createAsync(id));
    const doc = await contact.createAsync({
        _id: id,
        name,
        extras,
        context: new Types.ObjectId(c_id)
    });
    return doc.id;
};

const findByIdAsync = async (id, with_context = false) => {
    let contact_doc;
    if (with_context) {
        contact_doc = await contact.findByIdAsync(id).populate({
            path: context.modelName,
            model: context.modelName
        });
    } else {
        contact_doc = await contact.findByIdAsync(id);
    }
    return contact_doc;
};

const setExtraAsync = async (id, name, value) => {
    const contact_doc = await findByIdAsync(id);
    contact_doc.extras = contact_doc.extras || {};
    contact_doc.extras[name] = value;
    contact_doc.markModified(EXTRAS_KEY);
    await contact_doc.save();
    return contact_doc;
};

const getExtrasAsync = async (id) => {
    const contact_doc = await findByIdAsync(id);
    return contact_doc.extras;
};

const getExtraAsync = async (id, name) => {
    const contact_doc = await findByIdAsync(id);
    return contact_doc.extras[name];
};

const deleteExtraAsync = async (id, name) => {
    const contact_doc = await findByIdAsync(id);
    delete contact_doc.extras[name];
    contact_doc.markModified(EXTRAS_KEY);
    return contact_doc.save();
};

const getContextVariableAsync = async (id, name) => {
    const contact_doc = await findByIdAsync(id);
    return context_service.getVariableAsync(contact_doc.context, name);
};

const getContextVariablesAsync = async (id) => {
    const contact_doc = await findByIdAsync(id);
    return context_service.getVariablesAsync(contact_doc.context);
};

const setContextVariableAsync = async (id, name, value) => {
    const contact_doc = await findByIdAsync(id);
    return context_service.setVariableAsync(contact_doc.context, name, value);
};

const deleteContextVariableAsync = async (id, name) => {
    const contact_doc = await findByIdAsync(id);
    return context_service.deleteVariableAsync(contact_doc.context, name);
};

module.exports = {
    createAsync,
    findByIdAsync,
    setExtraAsync,
    getExtrasAsync,
    getExtraAsync,
    deleteExtraAsync,
    getContextVariableAsync,
    getContextVariablesAsync,
    setContextVariableAsync,
    deleteContextVariableAsync
};
