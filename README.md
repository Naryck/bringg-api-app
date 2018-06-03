Config file at './config/config.js' contains port of application, access token and secret.

Server launch:
	npm install
	npm start

Customer create:
	curl -X POST \
	http://localhost:8080/customers/ \
	-H 'Cache-Control: no-cache' \
	-H 'Content-Type: application/json' \
	-d '{
		"name": "Firstname Lastname",
		"phone": "+972555555555",
		"address": "Tel-Aviv, Rotschild Blvd., 40"
	}'

Task create:
Note:  order must have customer object; customer must have phone number!

	curl -X POST \
	http://localhost:8080/tasks/ \
	-H 'Cache-Control: no-cache' \
	-H 'Content-Type: application/json' \
	-d '{
		"title": "1-st Order for this customer",
		"address": "Tel-Aviv, HaBarzel st, 1",
		"note": "Please note: product name is SomeCoolProduct 2k18!",
		"scheduled_at": "2018-06-05T14:00:00.000Z",
		"lat": 12.9715987,
		"lng": 77.5945627,
		"customer": {
			"phone": "+972555555555"
		}
	}'

Tasks recreate:
	curl -X POST \
	'http://localhost:8080/tasks/recreate/+972555555555\
	-H 'Cache-Control: no-cache' 

Tasks by phone number:

	curl -X GET \
	'http://localhost:8080/tasks/phone/+972555555555\
	-H 'Cache-Control: no-cache' 

Tasks get all:

	curl -X GET \
	http://localhost:8080/tasks/ \
	-H 'Cache-Control: no-cache' 
