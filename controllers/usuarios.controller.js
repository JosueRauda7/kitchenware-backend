const { request, response } = require("express");

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

const usuariosPost = (req, res = response) => {
  const { nombre, edad } = req.body;

  res.status(201).json({
    msg: "post usuarios",
    nombre,
    edad,
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
