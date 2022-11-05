const { Router } = require("express");
const { check } = require("express-validator");
const {
  productosGet,
  productosPost,
  productosPut,
  productosDelete,
  productosGetById,
} = require("../controllers/productos.controller");
const { existeProducto, usuarioExiste } = require("../helpers/db-validators");
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
  productosGet
);

router.get(
  "/:id",
  [
    check("id", "El id no es válido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  productosGetById
);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("descripcion", "La descripción es obligatoria").not().isEmpty(),
    check("precio", "El precio es obligatorio").isNumeric(),
    validarCampos,
  ],
  productosPost
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "El id no es válido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  productosPut
);

router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "El id no es válido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  productosDelete
);

module.exports = router;
