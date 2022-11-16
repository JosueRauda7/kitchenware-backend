const path = require("path");
const { response } = require("express");

const subirArchivo = (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).json({
      msg: "Los archivos no han sido subidos.",
    });
    return;
  }

  if (!req.files.archivo) {
    res.status(400).json({
      msg: "El archivo no ha sido subido.",
    });
    return;
  }

  console.log("req.files >>>", req.files); // eslint-disable-line

  const { archivo } = req.files;

  const uploadPath = path.join(__dirname, "../uploads/", archivo.name);

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
