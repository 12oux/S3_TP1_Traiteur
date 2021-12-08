const express = require('express');
let session = require('express-session');
const app = express();
const port = 3000;
let route = require("./src/routes/site");
var path = require("path");

app.set("views", path.join(__dirname, "/src/views"));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "/public")));

app.use(express.json());
app.use(express.urlencoded());

app.use(route);

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});

module.exports = app;