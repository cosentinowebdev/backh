/**
 * Ruta : /api/usuarios
 */

const { Router } = require('express');
const { getUsuarios, crearUsuarios, actualizarUsuarios } = require('../controladores/usuarios.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const routes = Router();


routes.get('/',getUsuarios);
routes.post('/',
[
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('password','el password es obligatorio').not().isEmpty(),
    check('email','el email es obligatorio').isEmail(),    
    validarCampos,
]
,crearUsuarios);
routes.put('/:id',
[
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('role','el rol es obligatorio').not().isEmpty(),
    check('email','el email es obligatorio').isEmail(),    
    validarCampos,
],actualizarUsuarios);


module.exports = routes;