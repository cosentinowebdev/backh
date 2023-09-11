const { response } = require('express');
const Usuario = require('../modelos/usuarios.model')
const { validationResult } = require('express-validator');

const getUsuarios = async(req,res)=>{
    const usuarios = await Usuario.find({},'nombre email role google');
    res.status(200).json({
        ok: true,
        usuarios
    });

};
const crearUsuarios = async(req,res = response)=>{
    // console.log(req);
    // console.log(req.body);
    const {email,password,nombre } = req.body;
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msg:errores.mapped()
        });    
    }
    try {
        const existeEmail = await Usuario.findOne({email})
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg:"el correo esta registrado"
            });    
        }
        const usuario = new Usuario(req.body);
        console.log(usuario);
        await usuario.save();
        return res.status(200).json({
            ok: true,
            usuario: usuario
        });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"error inesperado... revisar logs"
        })
        
    }

};

module.exports = {
    getUsuarios,
    crearUsuarios
}