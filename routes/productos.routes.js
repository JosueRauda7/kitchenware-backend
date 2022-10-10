const { Router } = require("express");
const {
  productosGet,
  productosPost,
  productosPatch,
  productosPut,
  productosDelete,
} = require("../controllers/productos.controller");

const router = Router();

router.get("/", productosGet);

router.post("/", productosPost);

router.patch("/", productosPatch);

router.put("/", productosPut);

router.delete("/", productosDelete);

module.exports = router;
