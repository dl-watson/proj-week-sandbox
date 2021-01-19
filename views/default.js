const blessed = require("blessed");

const radioButton = require("./radio-buttons");
const mainScreens = require("./main-screens");

const screen = blessed.screen({
  smartCSR: true,
});

screen.title = "my window title";

const gameBox = mainScreens.gameBox(screen);
const gameInput = mainScreens.gameInput(gameBox);

const one = radioButton.one(gameInput, "one");
const two = radioButton.two(gameInput, "two");
const three = radioButton.three(gameInput, "three");
const four = radioButton.four(gameInput, "four");

screen.append(gameBox);

one.focus();

one.on("check", (e) => {
  radioButton.one(gameInput, "checked");
  screen.render();
});

screen.render();
