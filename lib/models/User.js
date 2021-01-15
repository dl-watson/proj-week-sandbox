const pool = require("../utils/pool");

module.exports = class User {
  user_id;
  username;
  passwordHash;

  constructor({ id, email, password_hash }) {
    this.id = id;
    this.email = email;
    this.passwordHash = password_hash;
  }

  static async insert({ email, passwordHash }) {
    const { rows } = await pool.query(
      `
      INSERT INTO users (
        email,
        password_hash)
      VALUES ($1, $2)
      RETURNING *;
    `,
      [email, passwordHash]
    );

    return new User(rows[0]);
  }

  static async findByUsername(username) {
    const { rows } = await pool.query(
      `
    SELECT * FROM users WHERE username=$1
    `,
      [username]
    );

    if (!rows[0]) throw new Error(`No user "${username}" found.`);
    return new User(rows[0]);
  }
};
