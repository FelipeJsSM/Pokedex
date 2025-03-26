// routes/Region.js
const express = require("express");
const router = express.Router();
const RegionController = require("../Controllers/RegionController");

// GET /regions -> Listado
router.get("/regions", RegionController.GetRegionList);

// GET /regions/create-region -> Form para crear
router.get("/create-region", RegionController.GetCreateRegion);

// POST /regions/create-region -> Procesa creación
router.post("/create-region", RegionController.PostCreateRegion);

// GET /regions/edit-region/:regionId -> Form para editar
router.get("/edit-region/:regionId", RegionController.GetEditRegion);

// POST /regions/edit-region -> Procesa edición
router.post("/edit-region", RegionController.PostEditRegion);

// POST /regions/delete-region -> Eliminar
router.post("/delete-region", RegionController.PostDeleteRegion);

module.exports = router;
