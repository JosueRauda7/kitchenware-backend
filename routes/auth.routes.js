const { Router } = require("express");
const { check } = require("express-validator");
const { login, register } = require("../controllers/auth.controllers");
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

module.exports = router;
