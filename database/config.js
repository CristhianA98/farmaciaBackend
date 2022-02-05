const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DBMONGO_ACCESS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Base de datos conectada");
    } catch (error) {
        console.log(error);
        throw new Error('Error al levantar la BD');
    }
}

module.exports = { dbConnection };