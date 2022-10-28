const { request, response, json } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJWT");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    // Verificar si email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({
        error: "Usuario no encontrado - Email",
      });
    }

    // Usuario está activo
    if (!usuario.estado) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(404).json({
        error: "Contraseña incorrecta",
      });
    }

    // Generar JWT
    const token = await generarJWT(usuario.uid);

    res.json({
      body: {
        usuario,
        token,
        msg: "Usuario logueado correctamente",
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Fallo en el login, hable con el administrador",
    });
  }
};

// const register = (req = request, res = response) => {
//   res.json({
//     body: {
//       msg: "register",
//     },
//   });
// };

module.exports = {
  login,
  // register,
};
