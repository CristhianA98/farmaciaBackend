const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers');
const { validarCampos } = require('../middlewares/validar-campos');

const router = new Router();

router.post('/login',[
    validarCampos
],login);

module.exports = router;