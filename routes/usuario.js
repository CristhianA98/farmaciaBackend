const { Router } = require("express");
const { check, param } = require('express-validator');

const { validarCampos, validarJWT } = require("../middlewares");
const { esRolValido, esEmailExistente, existeUsuarioId, verificarEstado } = require("../helpers/db-validator");
const { obtenerUsuarios, ingresarUsuario, actualizarUsuario, obtenerUsuario, eliminarUsuario } = require('../controllers');
const { Usuario } = require("../models");

const router = new Router;

//Obtener todos los usuarios
router.get('/', obtenerUsuarios);

//Obtener Usuario
router.get('/:id', [
    check('id', 'ID incorrecto').isMongoId(),
    check('id').custom(id => verificarEstado(id,Usuario)),
    validarCampos
], obtenerUsuario);

//Ingresar Usuario
router.post('/', [
    check('nombre', 'Nombre Obligatorio').notEmpty(),
    check('correo', 'Correo no Válido').isEmail(),
    check('password', 'Password debe contener min 6 caracteres').isLength({ min: 6 }),
    check('rol').custom(esRolValido),
    check('correo').custom(esEmailExistente),
    validarCampos
], ingresarUsuario);

//Actualizar Usuario
router.put('/:id', [
    validarJWT,
    check('id', 'ID incorrecto').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('rol').custom(esRolValido),
    check('id').custom(id => verificarEstado(id,Usuario)),
    validarCampos
], actualizarUsuario);

//Eliminar Usuario - Lógicamente
router.delete('/:id', [
    validarJWT,
    check('id', 'ID incorrecto').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
], eliminarUsuario);

module.exports = router;