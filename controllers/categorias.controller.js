const { Categoria, Producto } = require("../models/indexModels");

const getCategorias = async (req, res) => {
  const { start = 0, limit = 5, page = 1 } = req.query;
  const query = { estado: true };
  const [categorias, totalCategorias] = await Promise.all([
    Categoria.find(query)
      .skip(Number((start > 0 ? start - 1 : 0) * page))
      .limit(Number(limit)),
    Categoria.countDocuments(query),
  ]);

  res.json({
    body: {
      categorias,
      totalCategorias,
      page,
      msg: "Categorias obtenidas correctamente",
    },
  });
};
const getCategoriasById = async (req, res) => {
  const id = req.params.id;

  const { _id, nombre } = await Categoria.findById(id);
  const productos = await Producto.find({
    estado: true,
    categoria: _id,
  });

  res.json({
    body: {
      categoria: {
        _id,
        nombre,
        productos,
      },
      msg: "Categoria obtenida correctamente",
    },
  });
};
const postCategorias = async (req, res) => {
  const { nombre, imgCategoria, idUsuarioAdmin } = req.body;

  const categoria = new Categoria({
    nombre,
    imgCategoria,
    estado: true,
    createdBy: idUsuarioAdmin,
    updatedBy: idUsuarioAdmin,
  });

  await categoria.save();

  res.status(201).json({
    body: {
      categoria,
      msg: "Categoria registrado correctamente",
    },
  });
};
const putCategorias = async (req, res) => {
  const id = req.params.id;
  const { nombre, imgCategoria, idUsuarioAdmin, estado } = req.body;

  const categoria = await Categoria.findByIdAndUpdate(id, {
    nombre,
    imgCategoria,
    estado,
    updatedBy: idUsuarioAdmin,
  });

  res.json({
    body: {
      categoria,
      msg: "Categoria modificado correctamente",
    },
  });
};
const deleteCategorias = async (req, res) => {
  const id = req.params.id;
  const { idUsuarioAdmin } = req.body;
  const categoria = await Categoria.findByIdAndUpdate(
    id,
    { estado: false, updatedBy: idUsuarioAdmin },
    { new: true }
  );

  res.json({
    body: {
      categoria,
      msg: "La categoria ha sido eliminado correctamente",
    },
  });
};

module.exports = {
  getCategorias,
  getCategoriasById,
  postCategorias,
  putCategorias,
  deleteCategorias,
};
