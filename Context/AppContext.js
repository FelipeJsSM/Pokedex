const Sequelize = require("sequelize");
const path = require("path");

const connection = new Sequelize("sqlite::memory:", {
  dialect: "sqlite",  
  storage: path.join(
    path.dirname(require.main.filename),
    "Database",
    "Pokedexdb.sqlite"
  ),
});

module.exports = connection;