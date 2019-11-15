var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
var medicos = require('./medicos');
var especialidades = require('./especialidades');
var pacientes = require('./pacientes');
var turnos = require('./turnos');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "Content-Type");
       res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
          next();
    });
//mysql
global.connection = mysql.createConnection({
  host     : 'tpturnos.cehzqvvr6o08.sa-east-1.rds.amazonaws.com',
  port     : '3306',
  user     : 'admin',
  password : 'InuNHoYUvv6eMZxIW7AZ',
  database : 'turnos'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('Connectado con id ' + connection.threadId);
});

//api
app.use('/medicos', medicos);
app.use('/especialidades', especialidades);
app.use('/pacientes', pacientes);
app.use('/turnos', turnos);

app.use(function (req, res, next) {
  res.status(404).send("La dirección del request no existe!");
});

app.listen(3000, function () {
  console.log('App funcionando en puerto 3000!');
});


