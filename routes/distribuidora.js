const { Router } = require("express");
const { check } = require('express-validator');

const { validarCampos, validarJWT } = require("../middlewares");
const { verificarNombreRepetido, verificarEstado, existeDisribuidoraId } = require("../helpers/db-validator");
const { ingresarDistribuidora, obtenerDistribuidoras, obtenerDistribuidora, actualizarDistribuidora, eliminarDistribuidora } = require("../controllers");
const { Distribuidora } = require("../models");

const router = new Router;

//Obtener Distribuidoras
router.get('/', obtenerDistribuidoras);

//Obtener Distribuidora
router.get('/:id', [
    check('id', 'ID Incorrecto').isMongoId(),
    check('id').custom(existeDisribuidoraId),
    check('id').custom(id => verificarEstado(id, Distribuidora)),
    validarCampos
], obtenerDistribuidora);

//Ingresar Distribuidora
router.post('/', [
    validarJWT,
    check('nombre', 'Nombre Obligatorio').notEmpty(),
    check('nombre').custom(nombre => verificarNombreRepetido(nombre, Distribuidora)),
    validarCampos
], ingresarDistribuidora);

//Actualizar Distribuidora
router.put('/:id', [
    validarJWT,
    check('id', 'ID Incorrecto').isMongoId(),
    check('id').custom(existeDisribuidoraId),
    check('nombre').custom(nombre => verificarNombreRepetido(nombre, Distribuidora)),
    validarCampos
], actualizarDistribuidora);

//Eliminar Distribuidora
router.delete('/:id', [
    validarJWT,
    check('id', 'ID Incorrecto').isMongoId(),
    check('id').custom(existeDisribuidoraId),
    validarCampos
], eliminarDistribuidora);

module.exports = router;