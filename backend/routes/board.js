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

// consultar todas las actividades
router.get("/listTask", Auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(401).send("La persona no existe en BD");
  const board = await Board.find({ userId: req.user._id });
  return res.status(200).send({ board });
});

// editar actividad
router.put("/updateTask", Auth, async (req, res) => {
  // validamos usuario
  const user = await User.findById(req.user._id);
  if (!user) return res.status(401).send("No existe el usuario");
  // editamos actividad
  const board = await Board.findByIdAndUpdate(req.body._id, {
    userId: user._id,
    name: req.body.name,
    status: req.body.status,
    description: req.body.description,
  });
  if (!board) return res.status(401).send("no se pudo editar la actividad");
  return res.status(200).send({ board });
});

// eliminar tarea
router.delete("/:_id", Auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(401).send("no existe el usuario");
  const board = await Board.findByIdAndDelete(req.params._id);
  if (!board) return res.status(401).send("no hay tarea para eliminar");
  return res.status(200).send("Actividad eliminada");
});

// exportamos el modulo
module.exports = router;
