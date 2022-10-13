const { request, response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");

const usuariosGet = (req = request, res = response) => {
  const { page = 1, limit = 10 } = req.query;

  res.json({
    msg: "get usuarios",
    page,
    limit,
  });
};

const usuariosGetById = (req, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "get usuarios",
    id,
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
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  // Guardar en DB
  await usuario.save();

  res.status(201).json({
    usuario,
  });
};

const usuariosPatch = (req, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "patch usuarios",
  });
};

const usuariosPut = (req = require, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "put usuarios",
    id,
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
  usuariosPatch,
  usuariosPut,
  usuariosDelete,
};
