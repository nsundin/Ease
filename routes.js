/* 
 *all the routing information
 */
send = function(req, res) {
	res.send(res.locals.content);
};

module.exports = function(app, passport) {
	var session = require('./controllers/session');
	var company = require('./controllers/company');
	var location = require('./controllers/location');
	var item = require('./controllers/item');

//GET
	app.get('/api/company/:company', company.get, send);
	app.get('/api/company/:company/:location', company.get, location.get, send);
	app.get('/api/company/:company/:location/inventory',
		company.get,
		location.get,
		location.getInventory,
		send);

//CREATE
	app.post('/logout', session.postLogout);
	app.post('/login', passport.authenticate('local'), session.postLogin);
	app.post('/register', session.postRegister);
	app.post('/api/company/:company/:location', company.get, location.post);
	app.post('/api/company/:company/:location/inventory/:itemSku',
		company.get,
		location.get,
		location.getInventory,
		item.create);

//DELETE
	app.delete('/api/company/:company/:location/inventory/:itemSku',
		company.get,
		location.get,
		location.getInventory,
		item.delete);
	app.delete('/api/company/:company/:location',
		company.get,
		company.deleteLocation);

//UPDATE
	app.put('/api/company/:company/:location/inventory/:itemSku',
		company.get,
		location.get,
		location.getInventory,
		item.update);
	app.put('/api/company/:company/:location', company.get, company.updateLocation);
};
