const { Sequelize, DataTypes } = require("sequelize");
const connection = require("../Context/AppContext");

const Pokemon = connection.define("Pokemon", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  regionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tipoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Pokemon;