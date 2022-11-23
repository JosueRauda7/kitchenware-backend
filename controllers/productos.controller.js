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
    stock,
    categoria,
  } = req.body;

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

  const producto = new Producto({
    nombre,
    descripcion,
    detalles,
    imgProducto,
    precio,
    estado,
    stock,
    categoria,
    updatedBy: usuarioAdmin,
    createdBy: usuarioAdmin,
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
    estado,
    stock,
    categoria,
  } = req.body;

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
      stock,
      updatedBy: usuarioAdmin,
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

  const producto = await Producto.findByIdAndUpdate(
    id,
    { estado: false, updatedBy: usuarioAdmin },
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
