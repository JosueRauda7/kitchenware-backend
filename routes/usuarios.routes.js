const { Router } = require("express");
const { check, param } = require("express-validator");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosGetById,
} = require("../controllers/usuarios.controller");

// Validadores
const {
  esRolValido,
  emailExiste,
  usuarioExiste,
} = require("../helpers/db-validators");

// middlewares
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get(
  "/",
  [
    validarJWT,
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
  usuariosGet
);

router.get(
  "/:id",
  [check("id", "El id no es valido").isMongoId(), validarCampos],
  usuariosGetById
);

router.post(
  "/",
  [
    check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
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
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPut
);

router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(usuarioExiste),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
