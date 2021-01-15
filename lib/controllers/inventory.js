const { Router } = require("express");
const Inventory = require("../models/Inventory");

module.exports = Router()
  .get("/:gameid/:id", (req, res, next) => {
    Inventory.viewInventory(req.params.gameid, req.params.id)
      .then((data) => res.send(data))
      .catch(next);
  })

  .get("/add/:gameid/:id/:name", (req, res, next) => {
    Inventory.addToInventory(req.params.gameid, req.params.id, req.params.name)
      .then((data) => res.send(data))
      .catch(next);
  })

  .get("/remove/:gameid/:id/:name", (req, res, next) => {
    Inventory.removeFromInventory(
      req.params.gameid,
      req.params.id,
      req.params.name
    )
      .then((data) => res.send(data))
      .catch(next);
  });
