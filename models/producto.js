const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del producto es requerido"],
  },
  descripcion: {
    type: String,
    required: [true, "La descripción del producto es requerido"],
  },
  detalles: {
    type: Object,
  },
  img: {
    type: String,
  },
  precio: {
    type: Number,
    required: [true, "El producto requiere de un precio"],
  },
  estado: {
    type: Boolean,
    required: [true, "El producto requiere de un estado"],
  },
  stock: {
    type: Number,
    required: [true, "El producto requiere un número de existencias"],
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

// Devolver instancia sin los atributos deseados
ProductoSchema.methods.toJSON = function () {
  const { __v, createdBy, updatedBy, ...producto } = this.toObject();
  return producto;
};

module.exports = model("Producto", ProductoSchema);
