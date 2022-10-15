const { request, response } = require("express");
const Usuario = require("../models/usuario");
const { encriptarCadena } = require("../helpers/herramientas");

const usuariosGet = (req = request, res = response) => {
  const { page = 1, limit = 10 } = req.query;

  res.json({
    msg: "get usuarios",
    page,
    limit,
  });
};

const usuariosGetById = async (req, res = response) => {
  const id = req.params.id;
  const { password, ...usuario } = await Usuario.findById(id);

  res.json({
    usuario,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({
    nombre,
    correo,
    password,
    rol,
  });

  // Encriptar la contraseña
  usuario.password = encriptarCadena(password);

  // Guardar en DB
  await usuario.save();

  res.status(201).json({
    usuario,
  });
};

const usuariosPut = async (req = require, res = response) => {
  const id = req.params.id;
  const { _id, password, google, ...body } = req.body;

  // Validar contra base de datos
  if (password) {
    // Encriptar la contraseña
    body.password = encriptarCadena(password);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, body, { new: true });

  res.json({
    usuario,
  });
};

const usuariosDelete = (req, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "delete usuarios",
  });
};

module.exports = {
  usuariosGet,
  usuariosGetById,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
