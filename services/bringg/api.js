const config = require('../../config/config');
const request = require('request');
const crypto = require('crypto');

/**
 * Signs and returns object with "signature" SHA1 value
 * @param {*} data 
 */
const sign = (data) => {
	let results = Object.assign(data, { timestamp: Date.now() }, config.bringg.api.auth);
	let string = Object.keys(data).map(key => key + '=' + encodeURIComponent(data[key])).join('&');
	results.signature = crypto.createHmac('sha1', config.bringg.api.secret_key).update(string).digest('hex');

	return results;
}
/**
 * POST and GET requests helpers
 * @param {*} form body of POST request
 * @param {*} qs - querystring of GET request
 */
exports.post = (postfix, form) => exports.request(postfix, 'POST', { form: sign(form) });
exports.get = (postfix, qs) => exports.request(postfix, 'GET', { qs: sign(qs) });

/**
 * 
 * @param {*} postfix 	string to comlplete URL
 * @param {*} method 	POST/GET
 * @param {*} options 	signed object
 */
exports.request = (postfix, method, options) => {
	const requestOptions = {
		url: config.bringg.api.endpoint + postfix,
		method,
		headers: {
			'Content-type': 'application/json'
		},
	}

	return new Promise((resolve, reject) => {
		request(Object.assign(requestOptions, options), (err, res, body) => {
			if (err || res.statusCode !== 200) {
				reject(err ? JSON.parse(err) : { error: res.statusCode + ': ' + res.statusMessage });
			} else {
				resolve(JSON.parse(body));
			}
		});
	});
}