const path = require("path");
const { v4: uuidv4 } = require("uuid");

const subirArchivo = (
  files,
  extensionesValidas = ["png", "jpg", "jpeg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const archivo = files.archivo;
    const nombreAbreviado = archivo.name.split(".");
    const extension = nombreAbreviado[nombreAbreviado.length - 1];
    const nuevoNombreArchivo = `${uuidv4()}.${extension}`;

    // Validar extensión
    if (!extensionesValidas.includes(extension)) {
      return reject({
        error: `Extensión .${extension} no es valida.`,
        estadoRes: 400,
      });
    }

    const uploadPath = path.join(
      __dirname,
      `../public/uploads`,
      carpeta,
      nuevoNombreArchivo
    );

    archivo.mv(uploadPath, (error) => {
      if (error) {
        return reject({ error, estadoRes: 500 });
        // return res.status(500).json({ err });
      }

      resolve(nuevoNombreArchivo);
    });
  });
};

module.exports = {
  subirArchivo,
};
