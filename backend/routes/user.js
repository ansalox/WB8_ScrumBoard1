// modulos importados - express y router
const express = require("express");
const router = express.Router();
const User = require("../models/user"); // importamos el modelo usuario
// Variable para importar la libreria encriptar pass
let bcrypt = require("bcrypt");

// metodo post para registrar un usuario - async await
router.post("/registerUser", async (req, res) => {
  // primero buscamos el usuario con el correo
  let user = await User.findOne({ email: req.body.email });
  // si el usuario ya existe debemos informar con un mensaje
  if (user) return res.status(400).send("El usuario ya existe");
  // encriptado
  const hash = await bcrypt.hash(req.body.password, 10);
  // guardamos los datos del usuario
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash, // contraseña encriptada
  });
  // guardamos el usuario en mongo y generamos un JWT para el usuario
  const result = await user.save();
  if (result) {
    // generamos un JWT para el usuario
    const jwtToken = user.generateJWT();
    res.status(200).send({ jwtToken });
  } else {
    return res.status(400).send("Error al registrar usuario");
  }
});

// exportamos el modulo para el backend
module.exports = router;
