const Type = require("../Models/Tipo");

// Listar todos los tipos
exports.GetTypeList = (req, res, next) => {
  Type.findAll()
    .then((result) => {
      const types = result.map(t => t.dataValues);
      res.render("type/type-list", {
        pageTitle: "Mantenimiento de Tipos",
        typs: types,
        hasTypes: types.length > 0,
        IsTypeList: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Formulario para crear tipo
exports.GetCreateType = (req, res, next) => {
  res.render("type/save-type", {
    pageTitle: "Crear Tipo",
    editMode: false,
    IsTypeList: true,
  });
};

// Procesar creación de tipo
exports.PostCreateType = (req, res, next) => {
  const name = req.body.Name;

  Type.create({ name })
    .then(() => {
      return res.redirect("/types");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Formulario para editar tipo
exports.GetEditType = (req, res, next) => {
  const id = req.params.typeId;

  Type.findOne({ where: { id } })
    .then((result) => {
      if (!result) {
        return res.redirect("/types");
      }

      const type = result.dataValues;

      res.render("type/save-type", {
        pageTitle: `Editar Tipo - ${type.name}`,
        type,
        editMode: true,
        IsTypeList: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Procesar edición de tipo
exports.PostEditType = (req, res, next) => {
  const id = req.body.TypeId;
  const name = req.body.Name;

  Type.update({ name }, { where: { id } })
    .then(() => {
      return res.redirect("/types");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Eliminar tipo
exports.PostDeleteType = (req, res, next) => {
  const id = req.body.TypeId;

  Type.destroy({ where: { id } })
    .then(() => {
      return res.redirect("/types");
    })
    .catch((err) => {
      console.log(err);
    });
};
