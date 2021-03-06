// Importamos los módulos a utilizar
const Sequelize = require("sequelize");
//importamos la base de datos.
const db = require("../config/db");
// Constante para obtener fecha
const now = new Date();

//Modelo de detalle de las ordenes
const OrderDetail = db.define("orderDetail", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = OrderDetail;
