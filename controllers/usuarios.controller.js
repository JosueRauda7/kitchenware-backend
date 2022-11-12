const { request, response } = require("express");
const Usuario = require("../models/usuario");
const { encriptarCadena } = require("../helpers/herramientas");
const { generarJWT } = require("../helpers/generarJWT");

const usuariosGet = async (req = request, res = response) => {
  const { page = 1, limit = 10, start = 0 } = req.query;
  const query = { estado: true };

  // Dos promesas que se ejecutan al mismo tiempo, optimizando el tiempo
  const [usuarios, totalUsuarios] = await Promise.all([
    await Usuario.find(query)
      .skip(Number((start > 0 ? start - 1 : 0) * page))
      .limit(Number(limit)),
    await Usuario.countDocuments(query),
  ]);

  const usuariosEnPagina = usuarios.length;

  res.json({
    body: {
      // respuesta,
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
  const usuario = await Usuario.findById(id);
  // const { password, ...usuario } = await Usuario.findById(id);

  res.json({
    body: {
      usuario,
      msg: "Usuario obtenido correctamente",
    },
  });
};

const usuariosPost = async (req, res = response) => {
  const { username, correo, password, rol } = req.body;
  const usuario = new Usuario({
    username,
    correo,
    password,
    rol,
  });

  // Encriptar la contraseña
  usuario.password = encriptarCadena(password);

  // Guardar en DB
  await usuario.save();

  // Generamos token
  const token = generarJWT(usuario._id);

  res.status(201).json({
    body: {
      _id: usuario._id,
      usuario,
      msg: "Usuario creado correctamente",
      token,
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

const usuariosDelete = async (req, res = response) => {
  const id = req.params.id;
  const usuarioAuth = req.usuarioAuth;

  usuarioAdmin = req.uid;

  if (!usuarioAdmin || !(usuarioAuth.rol === "ADMIN_ROL")) {
    res.status(401).json({
      errores: {
        errors: [{ msg: "El usuario no tiene permisos de administrador" }],
      },
      msg: "Ha habido un error, verificar el atributo error de la respuesta para más información",
    });

    return;
  }

  const usuario = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    body: {
      usuario,
      usuarioAuth,
      msg: "Usuario eliminado correctamente",
    },
  });
};

module.exports = {
  usuariosGet,
  usuariosGetById,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
