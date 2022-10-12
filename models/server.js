const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Endpoints
    this.usuariosPath = "/api/usuarios";
    this.productosPath = "/api/productos";

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body a JSON
    this.app.use(express.json());

    // Directorio público
    this.app.use(express.static("build"));
  }

  routes() {
    // Rutas usuarios
    this.app.use(this.usuariosPath, require("../routes/usuarios.routes"));
    // Rutas productos
    this.app.use(this.productosPath, require("../routes/productos.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en ${this.port}`);
    });
  }
}

module.exports = Server;
