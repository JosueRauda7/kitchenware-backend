const { Router } = require("express");
const { check } = require("express-validator");
const {
  cargarArchivo,
  actualizarImagen,
} = require("../controllers/uploads.controller");
const { validarArchivoSubir } = require("../middlewares/validar-archivo");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post("/", [validarArchivoSubir, validarCampos], cargarArchivo);

router.put(
  "/:coleccion/:id",
  [
    validarArchivoSubir,
    check("id", "El Id debe ser de MongoDB").isMongoId(),
    check("coleccion", "La colección que solicita no está permitida").isIn([
      "usuarios",
      "categorias",
      "productos",
    ]),
    validarCampos,
  ],
  actualizarImagen
);

module.exports = router;
