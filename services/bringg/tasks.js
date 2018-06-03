const api = require('./api')
const tools = require('../tools')

/**
 * Creates task for customer with customer_id found by phone number
 * @param {*} params
 */
exports.create = ({ title, customer_id, address, note, scheduled_at, lat, lng }) => api.post('tasks', { title, customer_id, address, note, scheduled_at, lat, lng })
	.then(({ task }) => task);

/**
 * Returns all tasks
 */
exports.all = () => {
	let results = [];
	//	Recursively get all tasks
	const req = (page) => api.get('tasks', { page }).then(tasks => {
		if (tasks.length !== 0) {
			results = [...results, ...tasks];
			return req(++page);
		} else {
			return results;
		}
	})
	return req(1);

}

/**
 * Gets all tasks, filters results comparing parameter with each task
 * @param {*} Object to compare with every task
 */
exports.byFilter = (query) => exports.all().then(tasks => tasks.filter(task => tools.isEquivalent(task, query)));
