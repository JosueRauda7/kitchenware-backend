const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPost,
  usuariosPatch,
  usuariosPut,
  usuariosDelete,
  usuariosGetById,
} = require("../controllers/usuarios.controller");
const Role = require("../models/rol");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", usuariosGet);

router.get("/:id", usuariosGetById);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "El correo no es valido").isEmail(),
    check("password", "La contraseña debe ser más de 6 letras").isLength({
      min: 6,
    }),
    // check("rol", "No es un rol permitido").isIn(["ADMIN_ROL", "USER_ROL"]),
    check("rol").custom(async (rol = "") => {
      const existeRol = await Role.findOne({ rol });
      if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la base de datos`);
      }
    }),
    validarCampos,
  ],
  usuariosPost
);

router.patch("/:id", usuariosPatch);

router.put("/:id", usuariosPut);

router.delete("/:id", usuariosDelete);

module.exports = router;
