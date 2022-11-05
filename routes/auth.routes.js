const { Router } = require("express");
const { check } = require("express-validator");
const { login, registerByEmail } = require("../controllers/auth.controllers");
const { emailExiste, esRolValido } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").not().isEmpty(),
    check("correo", "El correo no es valido").isEmail(),
    validarCampos,
  ],
  login
);

router.post(
  "/register",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(emailExiste),
    check("password", "La contraseña debe ser más de 6 letras").isLength({
      min: 6,
    }),
    // check("rol", "No es un rol permitido").isIn(["ADMIN_ROL", "USER_ROL"]),
    validarCampos,
  ],
  registerByEmail
);

module.exports = router;
