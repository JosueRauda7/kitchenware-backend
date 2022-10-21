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
  imgProducto: {
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
});

// Devolver instancia sin los atributos deseados
ProductoSchema.methods.toJSON = function () {
  const { __v, ...producto } = this.toObject();
  return producto;
};

module.exports = model("Producto", ProductoSchema);
