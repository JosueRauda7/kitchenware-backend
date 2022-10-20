const { request, response } = require("express");
const Usuario = require("../models/usuario");
const { encriptarCadena } = require("../helpers/herramientas");

const usuariosGet = async (req = request, res = response) => {
  const { page = 1, limit = 10, start = 0 } = req.query;
  const query = { estado: true };
  const usuarios = await Usuario.find(query)
    .skip(Number((start > 0 ? start - 1 : start) * page))
    .limit(Number(limit));

  const usuariosEnPagina = usuarios.length;
  const totalUsuarios = await Usuario.countDocuments(query);

  res.json({
    body: {
      usuarios,
      msg: "Usuarios obtenidos correctamente",
      start,
      limit,
      page,
      usuariosEnPagina,
      totalUsuarios,
    },
  });
};

const usuariosGetById = async (req, res = response) => {
  const id = req.params.id;
  const { password, ...usuario } = await Usuario.findById(id);

  res.json({
    body: {
      usuario,
      msg: "Usuario obtenido correctamente",
    },
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
    body: {
      _id: usuario._id,
      msg: "Usuario creado correctamente",
    },
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
    body: {
      _id: usuario._id,
      msg: "Usuario modificado correctamente",
    },
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
