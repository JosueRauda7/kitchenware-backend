const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema({
  nombre: {
    type: String,
    unique: true,
    required: [true, "El nombre es obligatorio"],
  },
  imgCategoria: {
    type: String,
  },
  estado: {
    type: Boolean,
    required: [true, "La categoria requiere de un estado"],
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
CategoriaSchema.methods.toJSON = function () {
  const { __v, createdBy, updatedBy, ...categoria } = this.toObject();
  return categoria;
};

module.exports = model("Categoria", CategoriaSchema);
