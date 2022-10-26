const { response } = require("express");
const Producto = require("../models/producto");

const productosGet = async (req, res = response) => {
  const { start = 0, limit = 5, page = 1 } = req.query;
  const query = { estado: true };
  const [productos, totalProductos] = await Promise.all([
    Producto.find(query)
      .skip(Number((start > 0 ? start - 1 : start) * page))
      .limit(Number(limit)),
    Producto.countDocuments(query),
  ]);

  res.json({
    body: {
      productos,
      totalProductos,
      msg: "Productos obtenido correctamente",
    },
  });
};

const productosGetById = async (req, res) => {
  const id = req.params.id;
  const producto = await Producto.findById(id);

  res.json({
    body: {
      producto,
      msg: "Producto obtenido correctamente",
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
    categoria,
    idUsuarioAdmin,
  } = req.body;

  const producto = new Producto({
    nombre,
    descripcion,
    detalles,
    imgProducto,
    precio,
    estado,
    categoria,
    updatedBy: idUsuarioAdmin,
    createdBy: idUsuarioAdmin,
  });

  await producto.save();

  res.status(201).json({
    producto,
    msg: "post productos",
  });
};

const productosPut = async (req, res = response) => {
  const id = req.params.id;

  const {
    nombre,
    descripcion,
    detalles,
    imgProducto,
    precio,
    idUsuarioAdmin,
    estado,
  } = req.body;

  const producto = await Producto.findByIdAndUpdate(
    id,
    {
      nombre,
      descripcion,
      detalles,
      imgProducto,
      precio,
      estado,
      categoria,
      updatedBy: idUsuarioAdmin,
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
    { estado: false, updatedBy: idUsuarioAdmin },
    { new: true }
  );

  res.json({
    body: {
      producto,
      msg: "El producto se ha eliminado correctamente",
    },
  });
};

module.exports = {
  productosGet,
  productosGetById,
  productosPost,
  productosPut,
  productosDelete,
};
