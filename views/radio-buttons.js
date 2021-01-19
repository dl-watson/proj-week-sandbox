const blessed = require("blessed");

module.exports = {
  one(parent, text, left, right, bottom, top) {
    return blessed.radiobutton({
      parent,
      mouse: true,
      keys: true,
      shrink: true,
      padding: {
        left: 1,
        right: 1,
      },
      left: 0,
      bottom: 4,
      width: "45%",
      name: `option-${text}`,
      content: `option-${text}`,
      style: {
        focus: {
          bg: "none",
          fg: "white",
        },
        hover: {
          bg: "none",
          fg: "white",
        },
      },
      border: {
        type: "line",
      },
    });
  },

  two(parent, text) {
    return blessed.radiobutton({
      parent,
      mouse: true,
      keys: true,
      shrink: true,
      padding: {
        left: 1,
        right: 1,
      },
      right: 0,
      bottom: 4,
      width: "45%",
      name: `option-${text}`,
      content: `option-${text}`,
      style: {
        focus: {
          bg: "none",
          fg: "white",
        },
        hover: {
          bg: "none",
          fg: "white",
        },
      },
      border: {
        type: "line",
      },
    });
  },

  three(parent, text) {
    return blessed.radiobutton({
      parent,
      mouse: true,
      keys: true,
      shrink: true,
      padding: {
        left: 1,
        right: 1,
      },
      left: 0,
      bottom: 0,
      width: "45%",
      name: `option-${text}`,
      content: `option-${text}`,
      style: {
        focus: {
          bg: "none",
          fg: "white",
        },
        hover: {
          bg: "none",
          fg: "white",
        },
      },
      border: {
        type: "line",
      },
    });
  },

  four(parent, text) {
    return blessed.radiobutton({
      parent,
      mouse: true,
      keys: true,
      shrink: true,
      padding: {
        left: 1,
        right: 1,
      },
      right: 0,
      bottom: 0,
      width: "45%",
      name: `option-${text}`,
      content: `option-${text}`,
      style: {
        focus: {
          bg: "none",
          fg: "white",
        },
        hover: {
          bg: "none",
          fg: "white",
        },
      },
      border: {
        type: "line",
      },
    });
  },
};
