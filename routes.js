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

	app.get('/data/:company', company.get, send);
	app.get('/data/:company/:location', company.get, location.get, send);
	app.get('/data/:company/:location/inventory',
																			company.get,
																			location.get,
																			location.getInventory,
																			send);

	app.post('/logout', session.postLogout);
	app.post('/login', passport.authenticate('local'), session.postLogin);
	app.post('/register', session.postRegister); 
	app.post('/data/:company/:location', company.get, location.post);
	app.post('/data/:company/:location/inventory/:itemSku',
																			company.get,
																			location.get,
																			location.getInventory,
																			location.createItem);

	app.delete('/data/:company/:location/inventory/:itemSku',
																			company.get,
																			location.get,
																			location.getInventory,
																			location.deleteItem);
																			//it should be inventory.deleteItem,
																			//we know
	app.delete('/data/:company/:location', company.get,
																			company.deleteLocation);
};
