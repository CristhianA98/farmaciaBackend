const { Router } = require("express");
const { check } = require('express-validator');

const { validarCampos } = require("../middlewares");
const { esRolValido, esEmailExistente, existeUsuarioId } = require("../helpers/db-validator");
const { obtenerUsuarios, ingresarUsuario, actualizarUsuario, obtenerUsuario, eliminarUsuario } = require('../controllers');

const router = new Router;

//Obtener todos los usuarios
router.get('/', obtenerUsuarios);

//Obtener Usuario
router.get('/:id', [
    check('id', 'ID incorrecto').isMongoId(),
    check('id').custom(existeUsuarioId),
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
    check('id', 'ID incorrecto').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('rol').custom(esRolValido),
    validarCampos
], actualizarUsuario);

//Eliminar Usuario - Lógicamente
router.delete('/:id', [
    check('id', 'ID incorrecto').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
], eliminarUsuario);

module.exports = router;