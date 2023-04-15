const { sequelize } = require("../configuration");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
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
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    alllowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    alllowNull: false,
  },
});

const Band = sequelize.define("band", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

const Session = sequelize.define(
  "Session",
  {
    sid: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    sess: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    expire: {
      type: DataTypes.DATE,
      alllowNull: false,
    },
  },
  {
    tableName: "sessions",
    timestamps: false,
  }
);

module.exports = { User, Band };
