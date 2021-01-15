const pool = require("../utils/pool");

// Tech debt: add error messages for when rows aren't found, etc.
module.exports = {
  async newGame(userId) {
    const client = await pool.connect();

    try {
      const newGameId = await client.query(
        `
        INSERT INTO game_instances (game_completed)
        VALUES (false)
        RETURNING game_id
      `
      );

      // Create a new socket_uuid when a newGame is instantiated and pass it into the new query (hard-coded digit for now)
      await client.query(
        `
      INSERT INTO game_users (
          game_id,
          game_user_id, 
          socket_uuid, 
          current_location, 
          hp, 
          base_atk, 
          inventory)
      VALUES  ($1, $2, 1, 'entrance-hall', 20, 3, '{}')
    `,
        [newGameId.rows[0].game_id, userId]
      );

      const roomId = await client.query(
        `
      SELECT 
        room_id 
      FROM
        rooms
      JOIN 
        game_users
      ON 
        game_users.current_location = rooms.name
      WHERE
        game_users.game_user_id = $1
      AND
        game_users.game_id = $2
      `,
        [userId, newGameId.rows[0].game_id]
      );

      // VALUES ($1, $2, $3) will need to be repeated for as many items as there are in the entire game
      // item_id must exist
      const { rows } = await client.query(
        `
      INSERT INTO game_items (
        item_id, 
        game_id, 
        room_id)
      VALUES (49, $1, $2)
      RETURNING *
    `,
        [newGameId.rows[0].game_id, roomId.rows[0].room_id]
      );

      return rows[0];
    } catch (err) {
      throw new Error(err);
    } finally {
      client.release();
    }
  },

  async joinGame() {},
};
