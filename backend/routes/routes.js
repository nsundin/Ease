/* 
 * file that contains all the routing information
 */
var express = express,





//app.get('/items', session.auth, items.getItems);
//app.post('/items', session.auth, items.postItems);
app.post('/logout', session.postLogout);
app.post('/login', passport.authenticate('local'), session.postLogin);
app.post('/register', session.postRegister);
app.get('/company', company.getCompanies);
app.post('/company', company.postCompanies);
