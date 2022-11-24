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
const { validarJWT } = require("../middlewares/validar-jwt");

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
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    // check("nombre").custom(nombreCategoriaExiste),
    validarCampos,
  ],
  postCategorias
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "El id no es válido").isMongoId(),
    check("id").custom(existeCategoria),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    // check("nombre").custom(nombreCategoriaExiste),
    validarCampos,
  ],
  putCategorias
);

router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "El id no es válido").isMongoId(),
    check("id").custom(existeCategoria),
  ],
  deleteCategorias
);

module.exports = router;
