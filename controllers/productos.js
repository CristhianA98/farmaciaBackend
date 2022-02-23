const { Producto } = require("../models");

//Obtener productos
const obtenerProductos = async (req, res) => {

    const { desde = 0, limite = 10 } = req.query;

    const [total, productos] = await Promise.all([
        Producto.countDocuments({ estado: true }),

        Producto.find({ estado: true })
            .populate('usuario', 'nombre')
            .populate('distribuidora', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        ok: true,
        total,
        productos
    });
}

//Obtener Producto
const obtenerProducto = async (req, res) => {

    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('distribuidora', 'nombre')

    res.status(200).json({
        ok: true,
        producto
    });
}

//Ingresar Producto
const ingresarProducto = async (req, res) => {

    const { nombre, codigo, descripcion, cant_cajas, cant_unidades, distribuidora, caducidad, precio_unitario, precio_caja } = req.body;

    const data = {
        nombre: nombre.toUpperCase(),
        codigo,
        descripcion,
        cant_cajas,
        cant_unidades,
        distribuidora,
        caducidad,
        precio_unitario,
        precio_caja,
        usuario: req.id
    }

    const producto = new Producto(data);

    await producto.save();

    res.status(201).json({
        ok: true,
        producto
    });
}

//Actualizar producto
const actualizarProducto = async (req, res) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;


    data.nombre = data.nombre?.toUpperCase();
    data.usuario = req.id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({
        ok: true,
        producto
    });
}

//Eliminar Producto
const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.status(202).json({
        ok:true,
        producto
    });
}

module.exports = {
    obtenerProductos,
    ingresarProducto,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
}