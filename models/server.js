const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Endpoints
    this.paths = {
      auth: "/api/auth",
      categorias: "/api/categorias",
      ordenes: "/api/ordenes",
      productos: "/api/productos",
      uploads: "/api/uploads",
      usuarios: "/api/usuarios",
    };

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
    this.app.use(express.static("public"));

    // Manejar la carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    // Rutas autorización
    this.app.use(this.paths.auth, require("../routes/auth.routes"));
    // Rutas categorias
    this.app.use(this.paths.categorias, require("../routes/categorias.routes"));
    // Rutas ordenes
    this.app.use(this.paths.ordenes, require("../routes/ordenes.routes"));
    // Rutas productos
    this.app.use(this.paths.productos, require("../routes/productos.routes"));
    // Rutas usuarios
    this.app.use(this.paths.usuarios, require("../routes/usuarios.routes"));
    // Rutas uploads
    this.app.use(this.paths.uploads, require("../routes/uploads.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en ${this.port}`);
    });
  }
}

module.exports = Server;
