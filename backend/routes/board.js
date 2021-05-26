// importamos modulos
const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const User = require("../models/user");
const Auth = require("../middleware/auth");

// registrar actividad sin imagen
// http://localhost:3001/api/board/saveTask  (req)
router.post("/saveTask", Auth, async (req, res) => {
  // buscamos usuario de la peticion
  const user = await User.findById(req.user._id);
  // si no se encuentra el usuario
  if (!user) return res.status(401).send("Usuario no autenticado");
  // si el usuario existe procedemos a registrar
  const board = new Board({
    userId: user._id,
    name: req.body.name,
    description: req.body.description,
    status: "to-do",
  });
  // guardamos en mongoDB
  const result = await board.save();
  return res.status(200).send({ result });
});

// exportamos el modulo
module.exports = router;