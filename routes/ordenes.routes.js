const { Router } = require("express");
const { getOrdenes } = require("../controllers/ordenes.controllers");

const router = Router();

router.get("/", getOrdenes);

module.exports = router;
