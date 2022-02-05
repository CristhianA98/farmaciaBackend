const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Paths
        this.paths = {
            usuarios: '/usuarios'
        }

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();

        //Conectar BD
        this.conectarDB();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //cors
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //File Upload
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.usuarios, require('../routes/usuario'));
    }

    listen() {
        this.app.listen(this.port, () => console.log('Puerto: ', this.port));
    }
}

module.exports = Server;