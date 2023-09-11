/**
 * Ruta : /api/usuarios
 */

const { Router } = require('express');
const { getUsuarios, crearUsuarios } = require('../controladores/usuarios.controller');
const { check } = require('express-validator');

const routes = Router();


routes.get('/',getUsuarios);
routes.post('/',
[
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('password','el password es obligatorio').not().isEmpty(),
    check('email','el email es obligatorio').isEmail(),    
]
,crearUsuarios);


module.exports = routes;