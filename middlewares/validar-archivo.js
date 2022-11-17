const { response } = require("express");

const validarArchivoSubir = (req, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({
      errores: {
        errors: [{ msg: "Los archivos no han sido subidos." }],
      },
      msg: "Los archivos no han sido subidos.",
    });
  }

  next();
};

module.exports = {
  validarArchivoSubir,
};
