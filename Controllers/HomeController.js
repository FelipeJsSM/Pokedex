const Tipo = require("../Models/Tipo");
const Pokemon = require("../Models/Pokemon");
const Region = require("../Models/Region");
const { Op } = require("sequelize");

exports.GetIndex = (req, res, next) => {
  const nameFilter = req.query.name || "";       
  const regionFilter = req.query.regionId || ""; 

  const whereCondition = {};

  if (nameFilter) {
    whereCondition.name = { [Op.like]: `%${nameFilter}%` };
  }

  if (regionFilter) {
    whereCondition.regionId = regionFilter;
  }

  Promise.all([
    Pokemon.findAll({
      where: whereCondition,
      include: [Region, Tipo]
    }),
    Region.findAll()
  ])
    .then(([pokemonResults, regionResults]) => {
      const pokemons = pokemonResults.map(p => p.get({ plain: true }));
      const regions = regionResults.map(r => r.get({ plain: true }));

      res.render("home/index", {
        pageTitle: "Gestor de Pokedex",
        pokemons: pokemons,
        hasPokemons: pokemons.length > 0,

        regions: regions,           
        selectedName: nameFilter,   
        selectedRegion: regionFilter
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
