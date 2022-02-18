const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");

const validarJWT = async (req, res, next) => {
    const token = req.header('usuario-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token"
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);

        //Encontrar usuario
        const usuario = await Usuario.findById(id);

        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:'Token no válido, usuario no encontrado'
            });
        }

        //Verificar estado del usuario
        if(!usuario.estado){
            return res.status(400).json({
                ok:false,
                msg:'Usuario se encuentra en estado Inactivo'
            });
        }

        req.usuario = usuario;
        req.id = id;

        next();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Ingrese Token Correcto'
        });
    }
}

module.exports = {
    validarJWT
}