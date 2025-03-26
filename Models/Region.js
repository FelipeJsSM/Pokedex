const { Sequelize, DataTypes } = require("sequelize");
const connection = require("../Context/AppContext");

const Region = connection.define("Region", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Region;