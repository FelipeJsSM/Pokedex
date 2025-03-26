// routes/Type.js
const express = require("express");
const router = express.Router();
const TypeController = require("../Controllers/TypeController");

// GET /types -> Listado de tipos
router.get("/types", TypeController.GetTypeList);

// GET /types/create-type -> Form crear
router.get("/create-type", TypeController.GetCreateType);

// POST /types/create-type -> Procesa creación
router.post("/create-type", TypeController.PostCreateType);

// GET /types/edit-type/:typeId -> Form editar
router.get("/edit-type/:typeId", TypeController.GetEditType);

// POST /types/edit-type -> Procesa edición
router.post("/edit-type", TypeController.PostEditType);

// POST /types/delete-type -> Eliminar
router.post("/delete-type", TypeController.PostDeleteType);

module.exports = router;