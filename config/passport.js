// Importar passport
const passport = require("passport");
// Utilizar la estrategia local
const LocalStrategy = require("passport-local");
// Importar la referencia al modelo que contiene los datos de autenticación
const User = require("../models/user");

// Definir nuestra estrategia de autentificacion
// Local Strategy --> realizar un login con credenciales propias (user, pass)
passport.use(
  new LocalStrategy(
    // Por defecto passport en LocalStrategy requiere de un usuario y una contraseña
    {
      usernameField: "email",
      passwordField: "password",
    },
    // Verificar si los datos enviados por el usuario son correctos
    async (email, password, done) => {
      try {
        // Realizar la búsqueda del usuario
        const user = await User.findOne({
          where: { email },
        });
        // Si el usuario existe, verificar si su contraseña es correcta
        if (!user.comparePassword(password)) {
          return done(null, false, {
            message: "¡Nombre de usuario o contraseña incorrecta!",
          });
        }

        // El usuario y la contraseña son correctas
        return done(null, user);
      } catch (error) {
        // El usuario no existe
        return done(null, false, {
          message:
            "¡La cuenta de correo electrónico no se encuentra registrada!",
        });
      }
    }
  )
);

// Permitir que passport lea los valores del objeto usuario
// Serializar el usuario
passport.serializeUser((user, callback) => {
  callback(null, user);
});

// Deserializar el usuario
passport.deserializeUser((user, callback) => {
  callback(null, user);
});

module.exports = passport;
