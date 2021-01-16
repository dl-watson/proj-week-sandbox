const { Router } = require("express");
const Inventory = require("../models/Inventory");

module.exports = Router()
  .get("/:gameId/:id", (req, res, next) => {
    Inventory.viewInventory(req.params.gameId, req.params.id)
      .then((data) => res.send(data))
      .catch(next);
  })

  .get("/add/:gameId/:id/:itemName", (req, res, next) => {
    Inventory.addToInventory(
      req.params.gameId,
      req.params.id,
      req.params.itemName
    )
      .then((data) => res.send(data))
      .catch(next);
  })

  .get("/remove/:gameId/:id/:itemName", (req, res, next) => {
    Inventory.removeFromInventory(
      req.params.gameid,
      req.params.id,
      req.params.itemName
    )
      .then((data) => res.send(data))
      .catch(next);
  });
