const { Schema, model } = require("mongoose");

const OrdenSchema = Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El usuario es requerido"],
  },
  orderItems: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Producto", required: true },
      cantidad: { type: Number, required: true },
    },
  ],
  ordenInformacion: [
    {
      nombre: { type: String, required: true },
      apellido: { type: String, required: true },
      direccion: {
        type: String,
        required: [true, "La dirección de entrega es requerida"],
      },
      ciudad: { type: String, required: true },
      telefono: {
        type: Number,
        required: [true, "El número de telefono es requerido"],
      },
    },
  ],
  numeroDeItems: {
    type: Number,
    required: [true, "La cantidad de productos es obligatoria"],
  },
  subTotal: {
    type: Number,
    required: [true, "El total de la orden es obligatorio"],
  },
  isPaid: {
    type: Boolean,
    required: [true, "El estado de pago es obligatorio"],
  },
  costoEnvio: {
    type: Number,
    required: [true, "El costo de envio es requerido"],
  },
  total: {
    type: Number,
    required: [true, "El total es obligatorio"],
  },
  estado: {
    type: String,
    required: [true, "El estado es requerido"],
    enum: ["Enviado", "Recibido", "De_Camino", "En_Lugar_Entrega", "Entregado"],
  },
  transaccionId: {
    type: String,
    // required: [true, "El Id de transaccion es obligatorio"],
  },
});

module.exports = model("Orden", OrdenSchema);
