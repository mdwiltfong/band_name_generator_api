const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("./database");

class BandName extends Model {}

BandName.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "bandnames",
    timestamps: false,
  }
);

module.exports = BandName;
