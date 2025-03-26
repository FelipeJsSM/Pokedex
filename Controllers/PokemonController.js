const Pokemon = require("../Models/Pokemon");
const Region = require("../Models/Region");
const Tipo = require("../Models/Tipo");

exports.GetPokemonList = (req, res, next) => {
  Pokemon.findAll({
    include: [{ model: Region }, { model: Tipo }]
  })
    .then((result) => {
      const pokemons = result.map(p => p.get({ plain: true }));
      console.log(JSON.stringify(pokemons, null, 2));
      res.render("pokemon/pokemon-list", {
        pageTitle: "Listado de Pokémon",
        poks: pokemons,
        hasPokemons: pokemons.length > 0,
        IsPokemonList: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  
};

// Formulario para crear Pokémon
exports.GetCreatePokemon = (req, res, next) => {
  Promise.all([Region.findAll(), Tipo.findAll()])
    .then(([regions, types]) => {
      res.render("pokemon/save-pokemon", {
        pageTitle: "Crear Pokémon",
        editMode: false,
        IsPokemonList: true,
        regions: regions.map(r => r.dataValues),
        types: types.map(t => t.dataValues),
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Procesar creación de Pokémon
exports.PostCreatePokemon = (req, res, next) => {
  const name = req.body.Name;
  const imageUrl = req.body.imageUrl;
  const regionId = req.body.regionId;
  const tipoId = req.body.tipoId;

  Pokemon.create({
    name,
    imageUrl,
    regionId,
    tipoId,
  })
    .then(() => {
      return res.redirect("/pokemons");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Formulario para editar Pokémon
exports.GetEditPokemon = (req, res, next) => {
  const id = req.params.pokemonId;

  Promise.all([
    Pokemon.findOne({ where: { id }, include: [Region, Tipo] }),
    Region.findAll(),
    Tipo.findAll(),
  ])
    .then(([pokemonResult, regions, types]) => {
      if (!pokemonResult) {
        return res.redirect("/pokemons");
      }

      const pokemon = pokemonResult.dataValues;

      res.render("pokemon/save-pokemon", {
        pageTitle: `Editar Pokémon - ${pokemon.name}`,
        pokemon,
        editMode: true,
        IsPokemonList: true,
        regions: regions.map(r => r.dataValues),
        types: types.map(t => t.dataValues),
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Procesar edición de Pokémon
exports.PostEditPokemon = (req, res, next) => {
  const id = req.body.PokemonId;
  const name = req.body.Name;
  const imageUrl = req.body.imageUrl;
  const regionId = req.body.regionId;
  const tipoId = req.body.tipoId;

  Pokemon.update(
    { name, imageUrl, regionId, tipoId },
    { where: { id } }
  )
    .then(() => {
      return res.redirect("/pokemons");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Eliminar Pokémon
exports.PostDeletePokemon = (req, res, next) => {
  const id = req.body.PokemonId;

  Pokemon.destroy({ where: { id } })
    .then(() => {
      return res.redirect("/pokemons");
    })
    .catch((err) => {
      console.log(err);
    });
};