const { Distribuidora } = require("../models");

//Obtener las Distribuidoras
const obtenerDistribuidoras = async (req, res) => {

    const { limite = 5, desde = 0 } = req.query;

    const [total, distribuidoras] = await Promise.all([
        Distribuidora.countDocuments({ estado: true }),

        Distribuidora.find({ estado: true })
            .populate("usuario", ["nombre", "correo"])
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        ok: true,
        total,
        distribuidoras
    });
}

//Obtener Distribuidora
const obtenerDistribuidora = async (req, res) => {

    const { id } = req.params;
    const distribuidora = await Distribuidora.findById(id).populate("usuario", ["nombre", "correo"]);

    res.status(200).json({
        ok: true,
        distribuidora
    });
}

//Ingresar Distribuidora
const ingresarDistribuidora = async (req, res) => {
    const { nombre, descripcion, direccion } = req.body;

    const data = {
        nombre: nombre.toUpperCase(),
        descripcion,
        direccion,
        usuario: req.usuario.id
    }

    const distribuidora = new Distribuidora(data);
    await distribuidora.save({ new: true });

    res.status(201).json({
        ok: true,
        distribuidora
    })
}

const actualizarDistribuidora = async (req, res) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre?.toUpperCase();
    data.usuario = req.id;

    const distribuidora = await Distribuidora.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({
        ok: true,
        distribuidora
    });
}

//Eliminar Distribuidora
const eliminarDistribuidora = async (req, res) => {

    const { id } = req.params;
    const distribuidora = await Distribuidora.findByIdAndUpdate(id,{estado:false},{new:true});

    res.status(200).json({
        ok: true,
        distribuidora
    });
}

module.exports = {
    ingresarDistribuidora,
    obtenerDistribuidoras,
    obtenerDistribuidora,
    actualizarDistribuidora,
    eliminarDistribuidora
}