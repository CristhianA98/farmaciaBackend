const usuarioController = require('./usuarios');
const distribuidoraController = require('./distribuidoras');
const authController = require('./auth');

module.exports = {
    ...usuarioController,
    ...distribuidoraController,
    ...authController
}