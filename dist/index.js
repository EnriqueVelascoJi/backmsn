//Packages
const express = require('express');
const mongoose = require("mongoose");
const pool = require('./DB/postgres');
var cors = require('cors');


//ENVIRONMENT VARIABLES
require('dotenv').config()

//Import DB Connection
//require('./DB')

//Init server
const app = express();

const PORT = process.env.PORT || 3020; 
 
//Middlewares 
app.use(cors()) 
app.use(express.json())

//Routes
app.use('/aeropuerto', require('./routes/Aeropuerto.Route')) 
app.use('/cliente', require('./routes/Cliente.Route')) 
app.use('/mecanico', require('./routes/Mecanico.Route')) 
app.use('/usuario', require('./routes/Usuario.Route'))
app.use('/incidencia', require('./routes/Incidencia.Route'))
app.use('/equipo', require('./routes/Equipo.Route'))
app.use('/archivo', require('./routes/Archivo.Route'))
app.use('/imagen', require('./routes/Imagen.Route'))
app.use('/refacciones-incidencias', require('./routes/RefaccionesIncidencias.Route'))
app.use('/refacciones', require('./routes/Refacciones.Route'))



app.use('/usuariogd', require('./routes/Usuariogd.Route'))

 




//Running server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})


