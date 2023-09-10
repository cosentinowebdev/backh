const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config') 

//Crea servidor express
const app = express();

// Configuracion CORS
app.use(cors);


//base de datos             
dbConnection();

//main_user
//sNVkBxwKpOIqWNNE

//rutas
app.get('/',(req,res)=>{

    res.status(200).json({
        ok: true,
        msg:"hola mundo"
    })

})


app.listen(process.env.PORT,()=>{
    console.log("servidor corriendo en el puerto: "+process.env.PORT);

});