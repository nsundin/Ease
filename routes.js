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

	app.get('/api/:company', company.get, send);
	app.get('/api/:company/:location', company.get, location.get, send);
	app.get('/api/:company/:location/inventory',
		company.get,
		location.get,
		location.getInventory,
		send);

	app.post('/logout', session.postLogout);
	app.post('/login', passport.authenticate('local'), session.postLogin);
	app.post('/register', session.postRegister); 
	app.post('/api/:company/:location', company.get, location.post);
	app.post('/api/:company/:location/inventory/:itemSku',
		company.get,
		location.get,
		location.getInventory,
		location.createItem);

	app.delete('/api/:company/:location/inventory/:itemSku',
		company.get,
		location.get,
		location.getInventory,
		location.deleteItem);
		//it should be inventory.deleteItem,
		//we know
	app.delete('/api/:company/:location', company.get,
		company.deleteLocation);


	app.put('/api/:company/', company.get, company.update);
	app.put('/api/:company/:location', company.get, location.get, location.update);
	app.put('/api/:company/:location/inventory/:itemSku', company.get, location.get, 
			location.getInventory, location.itemUpdate);

};
