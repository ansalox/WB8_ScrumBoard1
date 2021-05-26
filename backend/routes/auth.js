// modulos express y router
const express = require("express");
const router = express.Router();

// importamos mmodelo usuario
const User = require("../models/user");
// importamos bcrypt
const bcrypt = require("bcrypt");

// funcion login del usuario
router.post("/login", async (req, res) => {
  // buscamos el correo del usuario
  const user = await User.findOne({ email: req.body.email });
  // validamos si el correo trae o no resultados
  if (!user) return res.status(400).send("Email o password incorrectos");
  // comparamos el pass que entra con el hash de la bd
  const hash = await bcrypt.compare(req.body.password, user.password);
  // validamos si el pass coincide o no
  if (!hash) return res.status(400).send("Email o password incorrectos");
  // devolvemos el token
  const jwtToken = user.generateJWT();
  return res.status(200).send({ jwtToken });
});

// exportamos el modulo
module.exports = router;
