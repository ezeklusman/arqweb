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
     let query = "SELECT turnos.id, medicos.nombre AS medico, pacientes.nombre AS paciente, turnos.fecha FROM turnos INNER JOIN medicos ON turnos.id_medico=medicos.id INNER JOIN pacientes ON turnos.id_paciente=pacientes.id ORDER BY id ASC";
     connection.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            };
            res.send(result);
        });
});

router.post('/', async (req, res) => {
    let medico = req.body.medico;
    let paciente = req.body.paciente;
    let fecha = req.body.fecha;
    
    let query = "INSERT INTO `turnos` (id_medico, id_paciente, fecha) VALUES("+medico+","+paciente+",'"+fecha+"')";
    
    connection.query(query, (err, result) => {
            if (err) {
                res.send(err);
            };
            res.send(result);
        });
});


//Legajo
router.get('/:id', async (req, res) => {
     let query = "SELECT * FROM `turnos` WHERE id="+req.params.legajo+" ORDER BY id ASC";
     connection.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            };
            res.send(result);
        });
});


router.put('/:id', async (req, res) => {
    let medico = req.body.medico;
    let paciente = req.body.paciente;
    let fecha = req.body.fecha;
     let query = "UPDATE turnos SET id_medico = "+medico+", id_paciente = "+paciente+", fecha = '"+fecha+"' WHERE id = "+req.params.id;
     connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            };
            res.send(result);
        });
});

router.delete('/:id', async (req, res) => {
     let query = "DELETE FROM `turnos` WHERE id="+req.params.id;
     connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            };
            res.send(result);
        });
});