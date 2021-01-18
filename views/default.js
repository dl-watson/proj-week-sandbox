const blessed = require("blessed");

// Create a screen object
const screen = blessed.screen({
  smartCSR: true,
});

screen.title = "my window title";

// Create a box
const chatbox = blessed.box({
  top: "0",
  right: "0",
  width: "50%",
  height: "50%",
  content: "Hello {bold}world{/bold}!",
  tags: true,
  border: {
    type: "line",
  },
  style: {
    fg: "white",
    bg: "magenta",
    border: {
      fg: "#f0f0f0",
    },
    hover: {
      bg: "green",
    },
  },
});

const gamebox = blessed.box({
  top: "0",
  left: "0",
  width: "50%",
  height: "50%",
  content: "Hello {bold}world{/bold}!",
  tags: true,
  border: {
    type: "line",
  },
  style: {
    fg: "white",
    bg: "magenta",
    border: {
      fg: "#f0f0f0",
    },
    hover: {
      bg: "green",
    },
  },
});

const gameInput = blessed.box({
  bottom: "0",
  left: "0",
  width: "50%",
  height: "50%",
  content: "Hello {bold}world{/bold}!",
  tags: true,
  border: {
    type: "line",
  },
  style: {
    fg: "white",
    bg: "magenta",
    border: {
      fg: "#f0f0f0",
    },
    hover: {
      bg: "green",
    },
  },
});

const chatInput = blessed.box({
  bottom: "0",
  right: "0",
  width: "50%",
  height: "50%",
  content: "Hello {bold}world{/bold}!",
  tags: true,
  border: {
    type: "line",
  },
  style: {
    fg: "white",
    bg: "magenta",
    border: {
      fg: "#f0f0f0",
    },
    hover: {
      bg: "green",
    },
  },
});

// Append our boxes to the screen
screen.append(gamebox);
screen.append(chatbox);
screen.append(gameInput);
screen.append(chatInput);

screen.render();
