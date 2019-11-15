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
     let query = "SELECT id, nombre FROM `especialidades` ORDER BY id ASC";
     connection.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            };
            res.send(result);
        });
});

router.post('/', async (req, res) => {
    let nombre = req.body.nombre;
    
    let query =  "INSERT INTO `especialidades` (nombre) VALUES('"+nombre+"')";
    
    connection.query(query, (err, result) => {
            if (err) {
                res.send(err);
            };
            res.send(result);
        });
});


//Identificador
router.get('/:id', async (req, res) => {
     let query = "SELECT * FROM `especialidades` WHERE id="+req.params.id+" ORDER BY id ASC";
     connection.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            };
            res.send(result);
        });
});


router.put('/:id', async (req, res) => {
    let nombre = req.body.nombre;
    let medicos = req.body.medicos;
     let query = "UPDATE especialidades SET nombre = '"+nombre+"' WHERE id = "+req.params.id;
     connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            };
            res.send(result);
        });
});

router.delete('/:id', async (req, res) => {
     let query = "DELETE FROM `especialidades` WHERE id= "+req.params.id;
     connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            };
            res.send(result);
        });
});