const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config/config');
const router = require('./config/routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

router.init(app);

app.listen(config.app.port, () => {
	console.log('----- STARTING APPLICATION ON PORT', config.app.port, '-----');
});
