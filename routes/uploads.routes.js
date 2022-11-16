const { Router } = require("express");
const { check } = require("express-validator");
const { subirArchivo } = require("../controllers/uploads.controller");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post("/", [], subirArchivo);

module.exports = router;
