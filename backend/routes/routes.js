/* 
 * file that contains all the routing information
 */
module.exports = function(app, passport) {
	var session = require('./session');
	var company = require('./company');
	var location = require('./location');

	//app.get('/items', session.auth, items.getItems);
	//app.post('/items', session.auth, items.postItems);
	app.post('/logout', session.postLogout);
	app.post('/login', passport.authenticate('local'), session.postLogin);
	app.post('/register', session.postRegister);
	app.get('/data/:company', company.get); //not for production
	app.post('/data/:company', company.post);
	app.get('/data/:company/:location', location.get);
	app.post('/data/:company/:location', location.post);
	//app.get('/data/:company/:location/:inventory', inventory.get);
};

