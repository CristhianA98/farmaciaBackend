const { Usuario } = require("../models");
const bcrypt = require('bcrypt');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res) => {
    const { correo, password } = req.body;
    try {

        const usuario = await Usuario.findOne({ correo });

        //Verificar si usuario se encuentra registrado
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario/Password Incorrecto'
            });
        }

        //Verificar si el usuario se encuentra en estado activo
        if (!usuario.estado) {
            return res.status(400).json({
                ok: false,
                msg: `Usuario "${usuario.nombre}" se encuentra inactivo`
            });
        }

        //Verificar Pasword
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: `Usuario/Password Incorrecto`
            });
        }

        //Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Problemas en el login"
        });
    }
}

module.exports = {
    login
}