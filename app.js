var express = require("express");
var bodyParser = require("body-parser");
var mysql = require('mysql');

var app = express();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'mani',
  password : 'password',
  database : 'ITEMS'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

app.connection = connection;
app.connection.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
});
app.connection.query('USE ITEMS');

var routes = require("./routes/routes.js")(app);
 
var server = app.listen(3300, function () {
  console.log("Listening on port %s...", server.address().port);
});