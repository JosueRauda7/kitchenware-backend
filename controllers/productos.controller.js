const { response } = require("express");

const productosGet = (req, res = response) => {
  res.json({
    msg: "get productos",
  });
};

const productosPost = (req, res = response) => {
  res.status(201).json({
    msg: "post productos",
  });
};

const productosPatch = (req, res = response) => {
  res.json({
    msg: "patch productos",
  });
};

const productosPut = (req, res = response) => {
  res.json({
    msg: "put productos",
  });
};

const productosDelete = (req, res = response) => {
  res.json({
    msg: "delete productos",
  });
};

module.exports = {
  productosGet,
  productosPost,
  productosPatch,
  productosPut,
  productosDelete,
};
