const { Schema, model } = require('mongoose');

const DistribuidoraSchema = Schema({
    nombre:{
        type: String,
        required:[true,'Nombre Obligatorio']
    },
    descripcion:{
        type:String,
    },
    direccion:{
        type:String,
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    estado:{
        type: Boolean,
        default: true
    }
});

DistribuidoraSchema.methods.toJson = function(){
    const { __v, estado, ...distribuidora } = this.toObject();
    return distribuidora;
}

module.exports = model('Distribuidora',DistribuidoraSchema);