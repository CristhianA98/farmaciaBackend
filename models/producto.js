const { Schema, model } = require('mongoose');

const productoSchema = Schema(
    {
        nombre: {
            type: String,
            required: [true, 'Nombre Obligatorio']
        },
        codigo: {
            type: String
        },
        descripcion: {
            type: String
        },
        img: {
            type: String
        },
        cant_cajas: {
            type: Number,
            default: 0
        },
        cant_unidades: {
            type: Number,
            default: 0
        },
        precio_unitario:{
            type: Number,
            default: 0
        },
        precio_caja:{
            type: Number,
            default: 0
        },
        caducidad: {
            type: Date
        },
        distribuidora: {
            type: Schema.Types.ObjectId,
            ref: 'Distribuidora',
            require: [true, 'Distribuidora Obligatoria']
        },
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            require: [true, 'usuario Obligatorio']
        },
        estado: {
            type: Boolean,
            default: true
        }
    }
);

productoSchema.methods.toJSON = function(){
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model('Producto',productoSchema);