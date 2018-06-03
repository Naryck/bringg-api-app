const controllers = require('../controllers')


const helper = (ctrlMethod) => (request, response) => {
	ctrlMethod(request, response)
		.then(res => response.status(200).json(res))
		.catch(err => response.status(500).json(err))
}

exports.init = (app) => {
	app
		.route('/customers/')
		.post(helper(controllers.customers.create));

	app
		.route('/tasks/')
		.get(helper(controllers.tasks.all))
		.post(helper(controllers.tasks.create));

	app
		.route('/tasks/phone/:phone')
		.get(helper(controllers.tasks.allByPhone));

	app
		.route('/tasks/recreate/:phone')
		.post(helper(controllers.tasks.recreate));

};
