const { response } = require('express');
const Usuario = require('../modelos/usuarios.model');
const bcrypt = require('bcryptjs');

const getUsuarios = async(req,res)=>{
    const usuarios = await Usuario.find({},'nombre email role google');
    res.status(200).json({
        ok: true,
        usuarios
    });

};
const crearUsuarios = async(req,res = response)=>{

    const {email,password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({email})
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg:"el correo esta registrado"
            });    
        }
        const usuario = new Usuario(req.body);
        
        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        // guardar usuario
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
const actualizarUsuarios = async(req,res = response)=>{
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg:"no existe el usuario"
            });    
        }

        // TODO: validar token

        // actualizar usuario
        const campos = req.body;

        if (usuarioDB.email === campos.email) {
            delete campos.email;            
        } else {
            const existeEmail = await Usuario.findOne({email: campos.email})
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg:"el correo esta registrado"
                });    
            }
        }

        delete campos.password;
        delete campos.google;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos);

        return res.status(200).json({
            ok: true,
            usuarioViejo:usuarioDB,
            usuarioNuevo:usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"error inesperado... revisar logs"
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuarios
}