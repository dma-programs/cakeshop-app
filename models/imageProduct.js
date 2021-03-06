// Importamos los módulos a utilizar
const Sequelize = require("sequelize");
//importamos la base de datos.
const db = require("../config/db");
// Constante para obtener fecha
const now = new Date();

//Modelo de imagen del Producto
const ImageProduct = db.define("imageProduct", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fileName: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  path: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  originalName: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  mimeType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  size: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = ImageProduct;
