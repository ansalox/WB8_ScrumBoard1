const express = require("express");
const router = express.Router();
const Role = require("../models/role");

router.post("/registerRole", async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(401).send("Process failed: Incomplete data");

  const roleExists = await Role.findOne({ name: req.body.name });
  if (roleExists)
    return res.status(401).send("Process failed: role already exists");

  const role = new Role({
    name: req.body.name,
    description: req.body.description,
    active: true,
  });

  const result = await role.save();
  if (!result) return res.status(401).send("Failed to register role");
  return res.status(200).send({ result });
});

router.get("/listRole", async (req, res) => {
  const role = await Role.find();
  if (!role) return res.status(401).send("No role to delete");
  return res.status(200).send({ role });
});

module.exports = router;
