const { response } = require("express");
const Producto = require("../models/producto");

const productosGet = (req, res = response) => {
  res.json({
    msg: "get productos",
  });
};

const productosPost = async (req, res = response) => {
  const {
    nombre,
    descripcion,
    detalles,
    imgProducto,
    precio,
    estado = true,
  } = req.body;

  const producto = new Producto({
    nombre,
    descripcion,
    detalles,
    imgProducto,
    precio,
    estado,
  });

  await producto.save();

  res.status(201).json({
    producto,
    msg: "post productos",
  });
};

const productosPut = async (req, res = response) => {
  const id = req.params.id;

  const { nombre, descripcion, detalles, imgProducto, precio } = req.body;

  const producto = await Producto.findByIdAndUpdate(
    id,
    {
      nombre,
      descripcion,
      detalles,
      imgProducto,
      precio,
    },
    { new: true }
  );

  res.json({
    body: {
      producto,
      msg: "Producto modificado correctamente",
    },
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
  productosPut,
  productosDelete,
};
