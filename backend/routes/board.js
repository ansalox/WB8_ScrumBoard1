const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");

router.post("/saveTask", Auth, UserAuth, async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(401).send("Incomplete data");

  const board = new Board({
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    status: "to-do",
  });

  const result = await board.save();
  if (!result) return res.status(401).send("Failed to register task");
  return res.status(200).send({ result });
});

router.get("/listTask", Auth, UserAuth, async (req, res) => {
  const board = await Board.find({ userId: req.user._id });
  if (!board) return res.status(401).send("No tasks to delete");
  return res.status(200).send({ board });
});

router.put("/updateTask", Auth, UserAuth, async (req, res) => {
  if (
    !req.body._id ||
    !req.body.name ||
    !req.body.status ||
    !req.body.description
  )
    return res.status(401).send("Incomplete data");

  const board = await Board.findByIdAndUpdate(req.body._id, {
    userId: req.user._id,
    name: req.body.name,
    status: req.body.status,
    description: req.body.description,
  });
  if (!board) return res.status(401).send("Error editing task");
  return res.status(200).send({ board });
});

router.delete("/:_id", Auth, UserAuth, async (req, res) => {
  const board = await Board.findByIdAndDelete(req.params._id);
  if (!board) return res.status(401).send("Failed to delete task");
  return res.status(200).send("Task deleted");
});

module.exports = router;
