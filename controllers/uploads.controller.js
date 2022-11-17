const { response } = require("express");
const path = require("path");
const fs = require("fs");
const { subirArchivo } = require("../helpers/subir-archivo");
const { Usuario, Producto, Categoria } = require("../models/indexModels");

const cargarArchivo = async (req, res = response) => {
  try {
    // subir archivo
    const nombreArchivo = await subirArchivo(req.files);

    res.json({
      nombreArchivo,
    });
  } catch (error) {
    res.status(400).json({
      errores: {
        errors: [{ msg: error }],
      },
      msg: error,
    });
    return;
  }
};

const actualizarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;
  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          errores: {
            errors: [{ msg: "Este usuario no existe" }],
          },
          msg: "Este usuario no existe",
        });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          errores: {
            errors: [{ msg: "Este producto no existe" }],
          },
          msg: "Este producto no existe",
        });
      }
      break;
    case "categorias":
      modelo = await Categoria.findById(id);
      if (!modelo) {
        return res.status(400).json({
          errores: {
            errors: [{ msg: "Esta categoria no existe" }],
          },
          msg: "Esta categoria no existe",
        });
      }
      break;
    default:
      return res.status(500).json({
        errores: {
          errors: [{ msg: "Se me olvidó validar esto" }],
        },
        msg: "Se me olvidó validar esto",
      });
  }

  try {
    // limpiar imagenes previas
    // Preguntamos si tiene la imagen en el usuario guardado en mongo
    if (modelo.img) {
      // Creamos ruta de imagen a borrar
      const pathImagen = path.join(
        __dirname,
        "../uploads",
        coleccion,
        modelo.img
      );

      // Verificar si no ha sido borrado antes
      if (fs.existsSync(pathImagen)) {
        // Borramos imagen
        fs.unlinkSync(pathImagen);
      }
    }

    const nombreArchivo = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombreArchivo;

    await modelo.save();

    res.json({
      modelo,
    });
  } catch (error) {
    if (!error.estadoRes) {
      return res.status(500).json({
        errores: {
          errors: [{ msg: error }],
        },
        msg: error,
      });
    }

    return res.status(estadoRes).json({
      errores: {
        errors: [{ msg: error }],
      },
      msg: error,
    });
  }
};

module.exports = {
  cargarArchivo,
  actualizarImagen,
};
