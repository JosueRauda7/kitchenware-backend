const { Router } = require("express");
const {
  usuariosGet,
  usuariosPost,
  usuariosPatch,
  usuariosPut,
  usuariosDelete,
  usuariosGetById,
} = require("../controllers/usuarios.controller");

const router = Router();

router.get("/", usuariosGet);

router.get("/:id", usuariosGetById);

router.post("/", usuariosPost);

router.patch("/:id", usuariosPatch);

router.put("/:id", usuariosPut);

router.delete("/:id", usuariosDelete);

module.exports = router;
