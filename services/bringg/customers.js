const api = require('./api');

/**
 * Creates a customer
 * @param {*}  
 */
exports.create = ({ name, phone, address }) => api.post('customers', { name, phone, address }).then(({ customer }) => customer);

/**
 * Gets a customer with specified phone number
 * @param {*} phone 
 */
exports.byPhone = (phone) => api.get(`customers/phone/${phone}`, {}).then(({customer}) => customer)