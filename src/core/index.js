const services = require('./services');

(async _ => {
    try {
        await services.lana_db.start();
        console.log('connected!');
        console.log('creating new contact');
        const contact_id = await services.contacts.create();
        await services.contacts.set_extra(contact_id, 'foo', 'bar');
        await services.contacts.set_extra(contact_id, 'bar', 'foo');
        await services.contacts.set_context_variable(contact_id, 'foo', 'bar');
        await services.contacts.set_context_variable(contact_id, 'bar', 'foo');
        console.log('fetching extras');
        console.log(await services.contacts.get_extras(contact_id));
        console.log('updating extras');
        await services.contacts.set_extra(contact_id, 'foo', 'rab');
        console.log('refetching extras');
        console.log(await services.contacts.get_extras(contact_id));
        console.log('fetching contexts variables');
        console.log(await services.contacts.get_context_variables(contact_id));
        console.log('updating context variable');
        await services.contacts.set_context_variable(contact_id, 'foo', 'rab');
        console.log('refetching contexts variables');
        console.log(await services.contacts.get_context_variables(contact_id));
        console.log('fetching entire contact');
        console.log(await services.contacts.find_by_id(contact_id, true));
        console.log('removing foo from context variables');
        await services.contacts.delete_context_variable(contact_id, 'foo');
        console.log('refetching contexts variables');
        console.log(await services.contacts.get_context_variables(contact_id));
        console.log('removing foo from extras');
        await services.contacts.delete_extra(contact_id, 'foo');
        console.log('refetching extras');
        console.log(await services.contacts.get_extras(contact_id));
        console.log('fetching entire contact');
        console.log(await services.contacts.find_by_id(contact_id, true));
    } catch (err) {
        console.error(err);
    }
})();
