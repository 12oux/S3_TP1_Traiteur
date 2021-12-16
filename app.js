const express = require('express');
let session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
var path = require("path");

app.use(bodyParser.urlencoded({extended: false}));


app.set("views", path.join(__dirname, "/src/views"));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "/public")));

app.use(express.json());
app.use(express.urlencoded());

//Routing
const route = require("./src/routes/site");
const adminRoutes = require('./src/routes/admin');
app.use(adminRoutes);
app.use(route);

app.listen(port, () => {
    console.log('Chez bRoux app listening at http://localhost:${port}');
});

module.exports = app;