const { Rol, Usuario, Distribuidora } = require("../models")

const esRolValido = async (rol = '') => {
    const existeRol = await Rol.findOne({ rol });
    if (!existeRol) {
        throw new Error(`Rol "${rol}" no valido`);
    }

    return true;
}

const esEmailExistente = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    console.log(existeEmail);
    if (existeEmail) {
        throw new Error(`Correo "${correo}" ya se encuentra registrado`);
    }

    return true;
}

const existeUsuarioId = async (id = '') => {
    const usuarioId = await Usuario.findById(id);
    if (!usuarioId) {
        throw new Error(`ID "${id}" no encontrado`);
    }

    return true;
}


const verificarNombreRepetido = async (nombre = '', coleccion) => {
    const existeNombre = await coleccion.findOne({ nombre: nombre.toUpperCase()});
    if (existeNombre) {
        throw new Error(`"${nombre}" ya se encuentra registrado`);
    }
    return true;
}

const verificarEstado = async (id, coleccion) => {
    const { estado, nombre } = await coleccion.findById(id);

    if (!estado) {
        throw new Error(`"${nombre}" se encuentra en estado Inactivo`);
    }

    return true;
}

const existeDisribuidoraId = async (id = '') => {
    const existeDistribuidora = await Distribuidora.findById(id);

    if(!existeDistribuidora){
        throw new Error(`Id "${id}" no pertenece a una distribuidora`);
    }

    return true;
}

module.exports = {
    esRolValido,
    esEmailExistente,
    existeUsuarioId,
    verificarEstado,
    verificarNombreRepetido,
    existeDisribuidoraId,
}