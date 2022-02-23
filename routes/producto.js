const { Router } = require("express");
const { check  } = require('express-validator');

const { validarCampos, validarJWT } = require("../middlewares");
const { verificarEstado, existeProductoId, existeDisribuidoraId, verificarNombreRepetido } = require("../helpers/db-validator");
const { obtenerProductos, ingresarProducto, obtenerProducto, actualizarProducto, eliminarProducto } = require("../controllers");
const { Producto } = require("../models");

const router = new Router;

//Obtener todos los productos
router.get('/', obtenerProductos);

//Obtener producto
router.get('/:id',[
    check('id','ID incorrecto').isMongoId(),
    check('id').custom(existeProductoId),
    check('id').custom(id => verificarEstado(id, Producto)),
    validarCampos
],obtenerProducto);

//Ingresar productos
router.post('/', [
    validarJWT,
    check('nombre','Nombre Obligatorio').notEmpty(),
    check('nombre').custom(nombre => verificarNombreRepetido(nombre, Producto)),
    check('distribuidora','ID de distribuidora incorrecto').isMongoId(),
    check('distribuidora').custom(existeDisribuidoraId),
    validarCampos
], ingresarProducto);

//Actualizar producto
router.put('/:id',[
    validarJWT,
    check('id','ID incorrecto').isMongoId(),
    check('id').custom(existeProductoId),
    check('nombre').custom(nombre => verificarNombreRepetido(nombre, Producto)),
    validarCampos
],actualizarProducto);

//Eliminar producto
router.delete('/:id',[

    validarCampos
],eliminarProducto);

module.exports = router;