
const user = '<postgres mdwiltfong>'
const host = 'localhost'
const database = '<postgres bandnameapi>'
const password = '<postgres 5056>'
const port = '<postgres 5432>'

const { append } = require('express/lib/response')
const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
    logging: false
  })


class Dog extends Model {}

  Dog.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'dog',
    timestamps: false
  })
  
  export default Dog