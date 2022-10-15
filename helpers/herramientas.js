const bcrypt = require("bcryptjs");

// Encriptar cadenas
const encriptarCadena = (cadena) => {
  const salt = bcrypt.genSaltSync();
  const cadenaEncriptada = bcrypt.hashSync(cadena, salt);
  return cadenaEncriptada;
};

module.exports = {
  encriptarCadena,
};
