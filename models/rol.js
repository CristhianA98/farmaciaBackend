const { Schema, model } = require('mongoose');

const rolSchema = Schema({
    rol: {
        type: String,
        required: [true, "Rol Obligatorio"]
    }
});

module.exports = model('Rol', rolSchema);