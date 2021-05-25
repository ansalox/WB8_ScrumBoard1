// importamos modulos, mongoose para crear(simular) la coleccion y jwt para tokens de seguridad
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// importamos libreria para fechas
let moment = require("moment");

// creamos el esquema de la bd (coleccion)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date: { type: Date, default: Date.now }, // fecha actual del sistema
});

// generamos el jwt para los usuarios
userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      iat: moment().unix(), // fecha en codigo sin formato
    },
    "secretKey"
  );
};

// coleccion de mongo - modelo usuario
const User = mongoose.model("user", userSchema);

// exportamos el modulo al bakend
module.exports = User;
