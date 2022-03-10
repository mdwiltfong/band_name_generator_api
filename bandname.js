const { password } = require("pg/lib/defaults");
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

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "users",
    timestamps: false,
  }
);
module.exports = {
  BandName,
  User,
};
