const express = require('express');
let session = require('express-session');
var passport = require('passport');
var adminPassport = require('passport');



const bodyParser = require('body-parser');
const app = express();
const port = 3000;
var path = require("path");
let dbUser = require('./src/models/dbUser.js');
let dbAdmin = require('./src/models/dbAdmin.js')
let User = require('./src/models/User.js');
let Admin = require('./src/models/Admin.js');
let passportMiddleware= require('./src/middleware/passport');

//test
let adminPassportMiddleware= require('./src/middleware/adminPassport');
let LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.urlencoded({extended: false}));


app.set("views", path.join(__dirname, "/src/views"));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "/public")));

app.use(express.json());
app.use(express.urlencoded());

//Routing
const route = require("./src/routes/site");
const adminRoutes = require('./src/routes/admin');

//test

app.use(adminRoutes);
app.use(route);

app.use(session({
    secret: 'fkladjsf9ads08f7391r48fhjeoqr3;fnvhv134789fy3o149hfr34',
    resave: true, 
    saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());
passportMiddleware(passport, LocalStrategy);

//test
app.use(adminPassport.initialize());
app.use(adminPassport.session());
adminPassportMiddleware(adminPassport, LocalStrategy);

(async () => {
    await dbUser.sequelize.sync({ force: false });
})();
//test
(async () => {
    await dbAdmin.sequelize.sync({ force: false });
})();

app.listen(port, () => {
    console.log('Chez bRoux app listening at http://localhost:${port}');
});

module.exports = app;