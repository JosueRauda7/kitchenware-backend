const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

// middleware siempre lleva de parametros: req, res, next
const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      errores: {
        errors: [{ msg: "No hay token en la petición" }],
      },
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const usuario = await Usuario.findById(uid);
    // Es estado false?
    if (!usuario.estado) {
      return res.status(401).json({
        errores: {
          errors: [{ msg: "Token no valido. Usuario no existe" }],
        },
        msg: "Token no valido",
      });
    }
    req.usuarioAuth = usuario;
    req.uid = uid; // se añade en la request la uid
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      errores: {
        errors: [{ msg: "Token no valido" }],
      },
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validarJWT,
};
