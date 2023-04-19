// Requerimos el paquete mongoose para conectarnos a una base de datos MongoDB.
const mongoose = require("mongoose");

// Configuramos la opción "strictQuery" de mongoose para que sea más estricto en el manejo de las consultas a la base de datos.
mongoose.set("strictQuery", true);

// Nos conectamos a la base de datos "pokemon" en MongoDB.
mongoose.connect("mongodb://localhost/usuario", function (err, res) {
    if (err) {
        console.log("Error conectando a la BD" + err);
    }
    else {
        console.log(`connected to database`);
    }
});

// Requerimos el paquete express para crear una aplicación web.
const express = require('express');

// Creamos una instancia de la aplicación web.
const app = express();

// Requerimos los modelos de mongoose y las rutas de nuestra API.
require('./models/usuario');
var usuarioroute = require('./controllers/routes');

// Definimos el número del puerto en el que se ejecutará nuestra aplicación.
const PORT = 3000;

// Creamos una instancia de express.Router().
const router = express.Router();

// Requerimos el paquete body-parser para analizar los cuerpos de las solicitudes HTTP.
const bodyParser = require('body-parser');

// Usamos bodyParser.json() para analizar el cuerpo de las solicitudes HTTP que contienen datos JSON.
app.use(bodyParser.json());

// Configuramos las cabeceras CORS para permitir las solicitudes desde cualquier origen.
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
});



// Definimos una ruta básica que solo devuelve un mensaje de bienvenida.
router.get("/", function (req, res) {
    res.send("Holi")
});


// Agregamos la ruta definida anteriormente a nuestra aplicación.
app.use(router);


router.route('/usuario')
    .get(usuarioroute.findAllUsuario)
    .post(usuarioroute.addUsuario); 

router.route('/usuario/rol/:rol')
    .get(usuarioroute.findByRol) 


router.route('/usuario/id/:id')
    .delete(usuarioroute.deleteUsuario)
    .get(usuarioroute.findById);



// Agregamos las rutas definidas anteriormente a nuestra aplicación.
app.use('/api', router);

// Iniciamos el servidor y escuchamos en el puerto definido anteriormente.
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));