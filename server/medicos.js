var express = require('express');
var router = express.Router();
var app = express();
module.exports = router;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "Content-Type");
       res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
          next();
    });
//api

router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
     let query = "SELECT medicos.id as id, legajo, medicos.nombre, especialidades.nombre AS especialidad FROM `medicos` INNER JOIN especialidades ON medicos.`especialidad`=especialidades.`id` ORDER BY medicos.id ASC";
     connection.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            };
            res.send(result);
        });
});

router.post('/', async (req, res) => {
    let legajo = req.body.legajo;
    let nombre = req.body.nombre;
    let especialidad = req.body.especialidad;
    
    let query = "INSERT INTO `medicos` (legajo, nombre, especialidad) VALUES("+legajo+",'"+nombre+"', (SELECT id FROM especialidades WHERE nombre ='"+especialidad+"'))";
    
    connection.query(query, (err, result) => {
            if (err) {
                res.send(err);
            };
            res.send(result);
        });
});


//Legajo
router.get('/:legajo', async (req, res) => {
     let query = "SELECT * FROM `medicos` WHERE legajo="+req.params.legajo+" ORDER BY id ASC";
     connection.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            };
            res.send(result);
        });
});


router.put('/:legajo', async (req, res) => {
    let nombre = req.body.nombre;
    let especialidad = req.body.especialidad;
     let query = "UPDATE medicos SET nombre = '"+nombre+"', especialidad = (SELECT id FROM especialidades WHERE nombre ='"+especialidad+"') WHERE legajo = "+req.params.legajo;
     connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            };
            res.send(result);
        });
});

router.delete('/:legajo', async (req, res) => {
     let query = "DELETE FROM `medicos` WHERE legajo="+req.params.legajo;
     connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            };
            res.send(result);
        });
});