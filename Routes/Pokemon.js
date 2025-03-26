// routes/Pokemon.js
const express = require("express");
const router = express.Router();
const PokemonController = require("../Controllers/PokemonController");

// GET /pokemons/  -> Listado de pokémon
router.get("/pokemons", PokemonController.GetPokemonList);

// GET /pokemons/create-pokemon -> Formulario para crear
router.get("/create-pokemon", PokemonController.GetCreatePokemon);

// POST /pokemons/create-pokemon -> Procesa creación
router.post("/create-pokemon", PokemonController.PostCreatePokemon);

// GET /pokemons/edit-pokemon/:pokemonId -> Formulario editar
router.get("/edit-pokemon/:pokemonId", PokemonController.GetEditPokemon);

// POST /pokemons/edit-pokemon -> Procesa edición
router.post("/edit-pokemon", PokemonController.PostEditPokemon);

// POST /pokemons/delete-pokemon -> Eliminar
router.post("/delete-pokemon", PokemonController.PostDeletePokemon);

module.exports = router;