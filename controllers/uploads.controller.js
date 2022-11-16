const path = require("path");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");

const subirArchivo = (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).json({
      errores: {
        errors: [{ msg: "Los archivos no han sido subidos." }],
      },
      msg: "Los archivos no han sido subidos.",
    });
    return;
  }

  if (!req.files.archivo) {
    res.status(400).json({
      errores: {
        errors: [{ msg: "El archivo no ha sido subido." }],
      },
      msg: "El archivo no ha sido subido.",
    });
    return;
  }

  console.log("req.files >>>", req.files); // eslint-disable-line

  const { archivo } = req.files;
  const nombreAbreviado = archivo.name.split(".");
  const extension = nombreAbreviado[nombreAbreviado.length - 1];
  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
  const nuevoNombreArchivo = `${uuidv4()}.${extension}`;

  // Validar extensión
  if (!extensionesValidas.includes(extension)) {
    res.status(400).json({
      errores: {
        errors: [{ msg: `Extensión .${extension} no es valida.` }],
      },
      msg: `Extensión .${extension} no es valida.`,
      extension,
    });
    return;
  }

  const uploadPath = path.join(__dirname, "../uploads/", nuevoNombreArchivo);

  archivo.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ err });
    }

    res.json({ msg: "El archivo ha sido subido correctamente" });
  });
};

module.exports = {
  subirArchivo,
};
