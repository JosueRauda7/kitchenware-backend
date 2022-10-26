const mongoose = require("mongoose");
const { Categoria, Producto, Role, Usuario } = require("../models/indexModels");

// -------------ROLES-----------------

// Validacion a base de datos de roles para confirmar si existe
const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la base de datos`);
  }
};

// ------------USUARIOS---------------

// Verificar si el correo existe
const emailExiste = async (correo = "") => {
  const existeCorreo = await Usuario.findOne({ correo });
  if (existeCorreo) {
    throw new Error(`El correo ${correo} ya existe`);
  }
};

// Validacion a base de datos de usuarios para confirmar si existe
const usuarioExiste = async (id = "") => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario || !existeUsuario.estado) {
    throw new Error(`El usuario con id ${id} no existe`);
  }
};

// Verificar si el usuario que está eliminando es administrador
const usuarioEsAdmin = async (id = "") => {
  const usuario = await Usuario.findById(id);
  if (usuario.rol !== "ADMIN_ROL") {
    return false;
  }

  return true;
};

// Verificar si los parametro de paginado son positivos
const esNumeroPositivo = (numero = 0, valor = "") => {
  const esPositivo = numero >= 0 && !isNaN(numero);
  if (!esPositivo) {
    throw new Error(`El valor ${valor} debe ser un entero positivo`);
  }
};

// ----------PRODUCTOS-------------
const existeProducto = async (id = "") => {
  const producto = await Producto.findById(id);
  if (!producto || !producto.estado) {
    throw new Error(`El producto con el id ${id} no existe`);
  }
};

// ---------CATEGORIAS-------------
const existeCategoria = async (id = "") => {
  const categoria = await Categoria.findById(id);
  if (!categoria || !categoria.estado) {
    throw new Error(`La categoria con el id ${id} no existe`);
  }
};

const nombreCategoriaExiste = async (nombre = "") => {
  const categoria = await Categoria.findOne({ nombre });
  if (categoria) {
    throw new Error(`La categoria ${nombre} ya existe`);
  }
};

module.exports = {
  esRolValido,
  emailExiste,
  usuarioExiste,
  esNumeroPositivo,
  usuarioEsAdmin,
  existeProducto,
  existeCategoria,
  nombreCategoriaExiste,
};
