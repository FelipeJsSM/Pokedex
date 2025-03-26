const Region = require("../Models/Region");

// Listar todas las regiones
exports.GetRegionList = (req, res, next) => {
  Region.findAll()
    .then((result) => {
      const regions = result.map(r => r.dataValues);
      res.render("region/region-list", {
        pageTitle: "Mantenimiento de Regiones",
        regs: regions,
        hasRegions: regions.length > 0,
        IsRegionList: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Formulario para crear región
exports.GetCreateRegion = (req, res, next) => {
  res.render("region/save-region", {
    pageTitle: "Crear Región",
    editMode: false,
    IsRegionList: true,
  });
};

// Procesar creación de región
exports.PostCreateRegion = (req, res, next) => {
  const name = req.body.Name;

  Region.create({ name })
    .then(() => {
      return res.redirect("/regions");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Formulario para editar región
exports.GetEditRegion = (req, res, next) => {
  const id = req.params.regionId;

  Region.findOne({ where: { id } })
    .then((result) => {
      if (!result) {
        return res.redirect("/regions");
      }
      const region = result.dataValues;

      res.render("region/save-region", {
        pageTitle: `Editar Región - ${region.name}`,
        region: region,
        editMode: true,
        IsRegionList: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Procesar edición de región
exports.PostEditRegion = (req, res, next) => {
  const id = req.body.RegionId;
  const name = req.body.Name;

  Region.update({ name }, { where: { id } })
    .then(() => {
      return res.redirect("/regions");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Eliminar región
exports.PostDeleteRegion = (req, res, next) => {
  const id = req.body.RegionId;

  Region.destroy({ where: { id } })
    .then(() => {
      return res.redirect("/regions");
    })
    .catch((err) => {
      console.log(err);
    });
};
