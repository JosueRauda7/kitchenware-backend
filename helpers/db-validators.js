const mongoose = require("mongoose");
const Role = require("../models/rol");
const Usuario = require("../models/usuario");

// Validacion a base de datos de roles para confirmar si existe
const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la base de datos`);
  }
};

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
  if (!existeUsuario) {
    throw new Error(`El usuario con id ${id} no existe`);
  }
};

module.exports = {
  esRolValido,
  emailExiste,
  usuarioExiste,
};
