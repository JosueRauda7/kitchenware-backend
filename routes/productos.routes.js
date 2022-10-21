const { Router } = require("express");
const { check } = require("express-validator");
const {
  productosGet,
  productosPost,
  productosPatch,
  productosPut,
  productosDelete,
} = require("../controllers/productos.controller");
const { existeProducto } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", productosGet);

router.get("/:id", productosGet);

router.post(
  "/",
  [
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
    check("id", "El id no es válido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  productosPut
);

router.delete(
  "/:id",
  [
    check("id", "El id no es válido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  productosDelete
);

module.exports = router;
