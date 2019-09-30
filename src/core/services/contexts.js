const { context } = require('../schemas');
const { Types } = require('mongoose');
const model_name = context.modelName;

const create = (
    id = new Types.ObjectId(),
    variables = {},
    is_holding = false,
    holding_by = ''
) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doc = await context.create({
                _id: id,
                is_holding: is_holding,
                holding_by: holding_by,
                variables: variables
            });
            return resolve(doc.id);
        } catch (err) {
            return reject(err);
        }
    });
};

const find_by_id = id => {
    return new Promise(async (resolve, reject) => {
        try {
            return resolve(context.findById(id));
        } catch (err) {
            return reject(err);
        }
    });
};

const get_variables = id => {
    return new Promise(async (resolve, reject) => {
        try {
            const context_doc = await find_by_id(id);
            return resolve(context_doc.variables);
        } catch (err) {
            return reject(err);
        }
    });
};

const get_variable = (id, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            const context_doc = await find_by_id(id);
            return resolve(context_doc.variables[name]);
        } catch (err) {
            return reject(err);
        }
    });
};

const set_variable = (id, name, value) => {
    return new Promise(async (resolve, reject) => {
        try {
            const context_doc = await find_by_id(id);
            if (!context_doc.variables) context_doc.variables = {};
            context_doc.variables[name] = value;
            context_doc.markModified('variables');
            await context_doc.save();
            return resolve(context_doc);
        } catch (err) {
            return reject(err);
        }
    });
};

const delete_variable = (id, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            const context_doc = await find_by_id(id);
            delete context_doc.variables[name];
            context_doc.markModified('variables');
            return resolve(await context_doc.save());
        } catch (err) {
            return reject(err);
        }
    });
};

const hold = (id, holding_by) => {
    return new Promise(async (resolve, reject) => {
        try {
            const context_doc = await find_by_id(id);
            context_doc.is_holding = true;
            context_doc.holding_by = holding_by;
            return resolve(await context_doc.save());
        } catch (err) {
            return reject(err);
        }
    });
};

const release = id => {
    return new Promise(async (resolve, reject) => {
        try {
            const context_doc = await find_by_id(id);
            context_doc.is_holding = false;
            context_doc.holding_by = '';
            return resolve(await context_doc.save());
        } catch (err) {
            return reject(err);
        }
    });
};

const status = id => {
    return new Promise(async (resolve, reject) => {
        try {
            const context_doc = await find_by_id(id);
            return resolve({
                is_holding: context_doc.is_holding,
                holding_by: context_doc.holding_by
            });
        } catch (err) {
            return reject(err);
        }
    });
};

module.exports = {
    model_name,
    create,
    find_by_id,
    get_variables,
    get_variable,
    set_variable,
    delete_variable,
    hold,
    release,
    status
};
