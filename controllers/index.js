const usuarioController = require('./usuarios');
const distribuidoraController = require('./distribuidoras');
const authController = require('./auth');
const productoController = require('./productos');

module.exports = {
    ...usuarioController,
    ...distribuidoraController,
    ...authController,
    ...productoController
}