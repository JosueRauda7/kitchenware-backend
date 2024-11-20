const { request, response } = require("express");

const getOrdenes = (req = request, res = response) => {
  return res.json({
    msg: "getOrdenes",
  });
};

module.exports = {
  getOrdenes,
};
