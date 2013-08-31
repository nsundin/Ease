/* 
 * file that contains all the routing information
 */
send = function(req, res) {
	res.send(res.locals.content);
};

send_ok = function(req, res) {
	res.send('ok');
};

module.exports = function(app, passport) {
	var session = require('./controllers/session');
	var company = require('./controllers/company');
	var location = require('./controllers/location');
	var items = require('./controllers/items');

	app.post('/logout', session.postLogout);
	app.post('/login', passport.authenticate('local'), session.postLogin);
	app.post('/register', session.postRegister);
	app.get('/data/:company', company.get, send);
	app.post('/data/:company', company.post); //not for production
	app.get('/data/:company/:location', company.get, location.get, send);
	app.post('/data/:company/:location', company.get, location.post);
	app.get('/data/:company/:location/inventory',
																			company.get,
																			location.get,
																			location.getInventory,
																			send);
	app.post('/data/:company/:location/inventory/:item',
																			company.get,
																			location.get,
																			items.create);
};
