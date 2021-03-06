// Importamos los módulos a utilizar
const Sequelize = require("sequelize");
//importamos la base de datos.
const db = require("../config/db");
const bcrypt = require("bcrypt-nodejs");
// Constante para obtener fecha
const now = new Date();

//Modelo de usuario
const User = db.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "¡Debes ingresar su nombre!",
        },
      },
    },
    lastName: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "¡Debes ingresar su apellido!",
        },
      },
    },
    email: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: {
        args: true,
        msg: "¡Ya existe un usuario registrado con esta dirección de correo!",
      },
      validate: {
        notEmpty: {
          msg: "¡Debes ingresar un correo electrónico!",
        },
        isEmail: {
          msg: "¡Verifica que tu correo es un correo electrónico válido!",
        },
      },
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "¡Debes ingresar una contraseña!",
        },
      },
    },
    phone: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "¡Debes ingresar un numero de teléfono!",
        },
      },
    },
    auth: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    token: Sequelize.STRING,
    expiration: Sequelize.DATE,
  },
  {
    hooks: {
      beforeCreate(user) {
        // Realizar el hash del password
        // https://www.npmjs.com/package/bcrypt
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(13));
      },
    },
  }
);

// Métodos personalizados
// Verificar si el password enviado (sin hash) es igual al almacenado (hash)
User.prototype.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = User;
