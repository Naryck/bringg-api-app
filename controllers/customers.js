const bringg = require('../services/bringg');

/**
 * Creating a customer with specified parameters
 * @param { name, phone, address } request 
 */
exports.create = (request) => bringg.customers.create(request.body);
