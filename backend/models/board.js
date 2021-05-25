// importamos modulos, mongoose para crear(simular) la coleccion
const mongoose = require("mongoose");

// creamos el esquema de la bd (coleccion)
const boardSchema = new mongoose.Schema({
  userId: String,
  name: String,
  description: String,
  status: String,
  imageUrl: String,
  date: { type: Date, default: Date.now }, // fecha actual del sistema
});

// coleccion board
const Board = mongoose.model("board", boardSchema);

// exportamos el modulo para el backend
module.exports = Board;
