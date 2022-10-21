const { response } = require("express");
const Producto = require("../models/producto");

const productosGet = async (req, res = response) => {
  const { start = 0, limit = 5, page = 1 } = req.query;
  const query = { estado: true };
  const [productos] = await Promise.all([
    Producto.find(query)
      .skip(Number((start > 0 ? start - 1 : start) * page))
      .limit(Number(limit)),
    Producto.find(query),
  ]);

  res.json({
    body: {
      productos,
      msg: "Productos obtenido correctamente",
    },
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

const productosDelete = async (req, res = response) => {
  const id = req.params.id;
  const { idUsuarioAdmin } = req.body;
  const producto = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    body: {
      producto,
      msg: "El producto se ha eliminado correctamente",
      idUsuarioAdmin,
    },
  });
};

module.exports = {
  productosGet,
  productosPost,
  productosPut,
  productosDelete,
};
