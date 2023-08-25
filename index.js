const express = require('express');

//Crea servidor express
const app = express();

//main_user
//sNVkBxwKpOIqWNNE

//rutas
app.get('/',(req,res)=>{

    res.status(200).json({
        ok: true,
        msg:"hola mundo"
    })

})


app.listen(3000,()=>{
    console.log("servidor corriendo en el puerto 3000");
});