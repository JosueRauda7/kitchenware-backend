const { Router } = require("express");
const { check, param } = require("express-validator");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosGetById,
} = require("../controllers/usuarios.controller");
const {
  esRolValido,
  emailExiste,
  usuarioExiste,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", usuariosGet);

router.get(
  "/:id",
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(usuarioExiste),
    validarCampos,
  ],
  usuariosGetById
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(emailExiste),
    check("password", "La contraseña debe ser más de 6 letras").isLength({
      min: 6,
    }),
    // check("rol", "No es un rol permitido").isIn(["ADMIN_ROL", "USER_ROL"]),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  // [check("id").custom((id) => esIdValido(id))],
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(usuarioExiste),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(emailExiste),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPut
);

router.delete("/:id", usuariosDelete);

module.exports = router;
