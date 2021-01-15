const express = require("express");
const app = express();

app.use(express.json());

app.use("/inventory", require("./controllers/inventory"));
app.use("/games", require("./controllers/games"));

app.use(require("./middleware/not-found"));
app.use(require("./middleware/error"));

module.exports = app;
