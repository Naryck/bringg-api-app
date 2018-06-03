const bringg = require('../services/bringg');
const moment = require('moment');

/**
 * Returns all tasks
 * @param {*} request 
 */
exports.all = (request) => bringg.tasks.all();

/**
 * Returns tasks of a customer with specified phone number
 * @param {*} request 
 */
exports.allByPhone = (request) => bringg.tasks.byFilter({ customer: { phone: request.params.phone } });

exports.get = (request) => bringg.tasks.get(request.params.id);

/**
 * Create order
 * Customer MUST have a phone number
 * 
 * @example 
 *	{ 
 *		"title": "1-st Order for customer 8569444",
 *		"address": "Tel-Aviv, HaBarzel st, 21",
 *		"note": "Please note: product name is 'SomeCoolProduct 2k18'!",
 *		"scheduled_at": "2018-06-05T14:00:00.000Z",
 *		"lat": 12.9715987,
 *		"lng": 77.5945627,
 *		"customer": {
 *			"phone": "+972777777777"
 *		}
 *	}
 * 
 * @param {*} request 
 */
exports.create = (request) => bringg.customers.byPhone(request.body.customer.phone)	//	find customer
	.then(customer => customer, (e) => bringg.customers.create(request.body.customer))	//	return customer or create a new one
	.then(customer => bringg.tasks.create(Object.assign(request.body, { customer_id: customer.id })));	//	fill order customer_id and create a task


/**
 * Recreates all tasks found for last week.
 * @param {*} request 
 * @returns Array of newly created tasks
 */
exports.recreate = (request) => {
	const today = new Date();

	return bringg.tasks
		.byFilter({ customer: { phone: request.params.phone } })
		.then(tasks => {
			return tasks
				.filter(task => moment(task.created_at).add(7, 'days').isAfter(today))
				.map(task => Object.assign(
					task,
					{
						note: task.task_notes ? task.task_notes[0].note : null,
						customer_id: task.customer.id
					})
				);
		})
		.then(tasks => Promise.all(tasks.map(task => bringg.tasks.create(task))));
}