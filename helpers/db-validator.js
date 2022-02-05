const { Rol, Usuario } = require("../models")

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
    if(!usuarioId){
        throw new Error(`ID "${id}" no encontrado`);
    }

    return true;
}

module.exports = {
    esRolValido,
    esEmailExistente,
    existeUsuarioId
}