const blessed = require("blessed");

module.exports = {
  gameBox(parent) {
    return blessed.box({
      parent,
      mouse: true,
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      content: "Hello {bold}world{/bold}!",
      tags: true,
      border: {
        type: "line",
        style: {
          fg: "green",
        },
      },
      style: {
        fg: "green",
        bg: "none",
        border: {
          fg: "#f0f0f0",
        },
        hover: {
          bg: "green",
        },
      },
    });
  },

  gameInput(parent) {
    return blessed.form({
      parent,
      mouse: true,
      keys: true,
      bottom: "0",
      left: "0",
      width: "99%",
      height: "50%",
      content: "Hello {bold}world{/bold}!",
      tags: true,
      border: {
        type: "line",
        style: {
          fg: "green",
        },
      },
      style: {
        fg: "green",
        bg: "none",
      },
    });
  },
};
