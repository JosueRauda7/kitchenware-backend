const { request, response, json } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJWT");
const { encriptarCadena } = require("../helpers/herramientas");

const login = async (req = request, res = response) => {
  const { username, password } = req.body;

  try {
    // Verificar si username existe
    const usuario = await Usuario.findOne({ username });
    if (!usuario) {
      return res.status(404).json({
        errores: {
          errors: [{ msg: "Usuario no existe", param: "username" }],
        },
        msg: "Usuario no existe",
      });
    }

    // Usuario está activo
    if (!usuario.estado) {
      return res.status(404).json({
        errores: {
          errors: [{ msg: "Usuario no existe", param: "username" }],
        },
        msg: "Usuario no existe",
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(404).json({
        errores: {
          errors: [{ msg: "Contraseña incorrecta", param: "password" }],
        },
        msg: "Contraseña incorrecta",
      });
    }

    // Generar JWT
    const token = await generarJWT(usuario._id);

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

const registerByEmail = async (req = request, res = response) => {
  const { username, correo, password } = req.body;

  const usuario = new Usuario({
    username,
    correo,
    password,
    estado: true,
    google: false,
    rol: "USER_ROL",
  });

  usuario.password = encriptarCadena(password);

  // Generar JWT
  const token = await generarJWT(usuario._id);

  usuario.save();

  res.json({
    body: {
      usuario,
      token,
      msg: "Usuario registrado correctamente",
    },
  });
};

module.exports = {
  login,
  registerByEmail,
};
