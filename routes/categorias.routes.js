const { Router } = require("express");
const { check } = require("express-validator");
const {
  getCategorias,
  getCategoriasById,
  postCategorias,
  putCategorias,
  deleteCategorias,
} = require("../controllers/categorias.controller");
const {
  usuarioExiste,
  existeCategoria,
  nombreCategoriaExiste,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get(
  "/",
  [
    check("limit", "El parámetro debe ser un entero positivo")
      .toInt()
      .isNumeric()
      // .custom((valor) => esNumeroPositivo(valor, "limit"))
      .optional(),
    check("start", "El parámetro debe ser un entero positivo")
      .toInt()
      .isNumeric()
      // .custom((valor) => esNumeroPositivo(valor, "start"))
      .optional(),
    check("page", "El parámetro debe ser un entero positivo")
      .toInt()
      .isNumeric()
      // .custom((valor) => esNumeroPositivo(valor, "page"))
      .optional(),
    validarCampos,
  ],
  getCategorias
);

router.get(
  "/:id",
  [
    check("id", "El id no es válido").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos,
  ],
  getCategoriasById
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre").custom(nombreCategoriaExiste),
    check("createdBy", "El campo createdBy es obligatorio").not().isEmpty(),
    check("updatedBy", "El campo updatedBy es obligatorio").not().isEmpty(),
    check("createdBy").custom(usuarioExiste),
    check("updatedBy").custom(usuarioExiste),
    check("createdBy", "El campo createdBy no es valido").isMongoId(),
    check("updatedBy", "El campo updatedBy no es valido").isMongoId(),
    validarCampos,
  ],
  postCategorias
);

router.put(
  "/:id",
  [
    check("id", "El id no es válido").isMongoId(),
    check("id").custom(existeCategoria),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre").custom(nombreCategoriaExiste),
    check("updatedBy", "El campo updatedBy es obligatorio").not().isEmpty(),
    check("updatedBy").custom(usuarioExiste),
    check("updatedBy", "El campo updatedBy no es valido").isMongoId(),
    validarCampos,
  ],
  putCategorias
);

router.delete(
  "/:id",
  [
    check("id", "El id no es válido").isMongoId(),
    check("id").custom(existeCategoria),
    check("idUsuarioAdmin", "El id no es valido").isMongoId(),
    check("idUsuarioAdmin").custom(usuarioExiste),
  ],
  deleteCategorias
);

module.exports = router;
