const { Types } = require('mongoose');
const { contact } = require('../schemas');
const context_service = require('./contexts');

const create = (
    id = new Types.ObjectId(),
    name = id,
    extras = {},
    context_id = null
) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!context_id) {
                context_id = await context_service.create(id);
            }
            const doc = await contact.create({
                _id: id,
                name: name,
                extras: extras,
                context: new Types.ObjectId(context_id)
            });
            return resolve(doc.id);
        } catch (err) {
            return reject(err);
        }
    });
};

const find_by_id = (id, with_context = false) => {
    return new Promise(async (resolve, reject) => {
        try {
            let contact_doc;
            if (with_context) {
                contact_doc = await contact.findById(id).populate({
                    path: 'context',
                    model: context_service.model_name
                });
            } else {
                contact_doc = await contact.findById(id);
            }
            return resolve(contact_doc);
        } catch (err) {
            return reject(err);
        }
    });
};

const set_extra = (id, name, value) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contact_doc = await find_by_id(id);
            if (!contact_doc.extras) contact_doc.extras = {};
            contact_doc.extras[name] = value;
            contact_doc.markModified('extras');
            await contact_doc.save();
            return resolve(contact_doc);
        } catch (err) {
            return reject(err);
        }
    });
};

const get_extras = id => {
    return new Promise(async (resolve, reject) => {
        try {
            const contact_doc = await find_by_id(id);
            return resolve(contact_doc.extras);
        } catch (err) {
            return reject(err);
        }
    });
};

const get_extra = (id, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contact_doc = await find_by_id(id);
            return resolve(contact_doc.extras[name]);
        } catch (err) {
            return reject(err);
        }
    });
};

const delete_extra = (id, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contact_doc = await find_by_id(id);
            delete contact_doc.extras[name];
            contact_doc.markModified('extras');
            return resolve(await contact_doc.save());
        } catch (err) {
            return reject(err);
        }
    });
};

const get_context_variable = (id, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contact_doc = await find_by_id(id);
            return resolve(
                await context_service.get_variable(contact_doc.context, name)
            );
        } catch (err) {
            return reject(err);
        }
    });
};

const get_context_variables = id => {
    return new Promise(async (resolve, reject) => {
        try {
            const contact_doc = await find_by_id(id);
            return resolve(
                await context_service.get_variables(contact_doc.context)
            );
        } catch (err) {
            return reject(err);
        }
    });
};

const set_context_variable = (id, name, value) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contact_doc = await find_by_id(id);
            return resolve(
                await context_service.set_variable(
                    contact_doc.context,
                    name,
                    value
                )
            );
        } catch (err) {
            return reject(err);
        }
    });
};

const delete_context_variable = (id, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contact_doc = await find_by_id(id);
            return resolve(
                await context_service.delete_variable(contact_doc.context, name)
            );
        } catch (err) {
            return reject(err);
        }
    });
};

module.exports = {
    create,
    find_by_id,
    set_extra,
    get_extras,
    get_extra,
    delete_extra,
    get_context_variable,
    get_context_variables,
    set_context_variable,
    delete_context_variable
};
