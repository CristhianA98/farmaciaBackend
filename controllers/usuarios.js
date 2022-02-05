const { Usuario } = require('../models');
const bcrypt = require('bcrypt');

const obtenerUsuarios = async (req, res) => {
    const { limite = 5, desde = 0 } = req.query;
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),

        Usuario.find({ estado: true })
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const obtenerUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);

    if (!usuario.estado) {
        return res.status(400).json({
            ok: false,
            msg: "Usuario se encuentra eliminado"
        });
    }

    res.status(200).json({
        ok: true,
        usuario
    });
}

const ingresarUsuario = async (req, res) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptar Password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    res.status(201).json({
        ok: true,
        usuario
    });
}

const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { _id, password, correo, ...resto } = req.body;

    //Guardar Password
    if (password) {
        //Encriptar Password
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    res.status(200).json({
        ok: "true",
        usuario
    });
}

const eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    const usuarioEliminado = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.status(202).json({
        ok:true,
        usuarioEliminado
    });
}

module.exports = {
    obtenerUsuarios,
    ingresarUsuario,
    actualizarUsuario,
    obtenerUsuario,
    eliminarUsuario
}