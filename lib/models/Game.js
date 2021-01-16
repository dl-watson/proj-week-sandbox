const pool = require("../utils/pool");

// Tech debt: add error messages for when rows aren't found, etc.
module.exports = {
  async newGame(userId) {
    const client = await pool.connect();

    try {
      let newGameId = await client.query(
        `
        INSERT INTO game_instances (game_completed)
        VALUES (false)
        RETURNING game_id
      `
      );

      newGameId = newGameId.rows[0].game_id;

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
        [newGameId, userId]
      );

      let roomId = await client.query(
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
        [userId, newGameId]
      );

      roomId = roomId.rows[0].room_id;

      // VALUES ($1, $2, $3) will need to be repeated for as many items as there are in the entire game
      // item_id must exist
      await client.query(
        `
      INSERT INTO game_items (
        item_id, 
        game_id, 
        room_id)
      VALUES (49, $1, $2)
      RETURNING *
    `,
        [newGameId, roomId]
      );

      // same deal with items: repeat VALUES ($1, $2, $3) for every event in the entire game
      // event_id must exist
      await client.query(
        `
      INSERT INTO game_events (
        event_id, 
        game_id, 
        room_id)
      VALUES (2, $1, $2)
      RETURNING *
      `,
        [newGameId, roomId]
      );

      const { rows } = await client.query(
        `
      INSERT INTO game_npcs (
        npc_id, 
        game_id, 
        room_id, 
        dialogue_exhausted, 
        alive)
      VALUES  (1, $1, $2, false, true)
      RETURNING game_id
      `,
        [newGameId, roomId]
      );

      return rows[0];
    } catch (err) {
      throw new Error(err);
    } finally {
      client.release();
    }
  },

  // Tech debt: will need to add error handling for cases in which a game by that id doesn't exist
  // userId will be derived from the requesting user, on a lookup by username, ensuring authentication
  async joinGame(gameId, userId) {
    const { rows } = await pool.query(
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
      RETURNING *
    `,
      [gameId, userId]
    );

    return rows[0];
  },
};
