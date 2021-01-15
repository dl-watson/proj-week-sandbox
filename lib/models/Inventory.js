const pool = require("../utils/pool");

// This model controls item-based actions, especially within a player's inventory
module.exports = {
  async viewInventory(gameId, gameUserId) {
    const { rows } = await pool.query(
      `
        SELECT 
            inventory
        FROM 
            game_users
        WHERE 
            game_users.game_user_id = $1
        AND 
            game_users.game_id = $2

    `,
      [gameUserId, gameId]
    );

    if (rows[0].inventory === []) return "Your inventory is empty.";
    else return rows[0];
  },

  // Fix: add error handling to this method
  async addToInventory(gameId, gameUserId, itemName) {
    const roomId = await pool.query(
      `
    SELECT
        game_items.room_id
    FROM 
        items
    JOIN
        game_items
        ON game_items.item_id = items.item_id
    WHERE 
        items.name = $1
    AND
        game_items.game_id = $2
    `,
      [itemName, gameId]
    );

    const getName = await pool.query(
      `
    SELECT 
        items.name
    FROM 
        items
    JOIN 
        game_items
        ON game_items.item_id = items.item_id
    WHERE 
        items.name = $1
    AND
        items.room_id = $2
    AND
        game_items.game_id = $3
    `,
      [itemName, roomId.rows[0]?.room_id, gameId]
    );

    await pool.query(
      `
            UPDATE 
                game_users
            SET 
                inventory = inventory || '{ ${getName.rows[0]?.name} }'
            WHERE 
                game_users.game_user_id = $1
            RETURNING *;
            `,
      [gameUserId]
    );

    const { rows } = await pool.query(
      `
        SELECT 
            inventory 
        FROM 
            game_users
        WHERE 
            game_users.game_user_id = $1
        `,
      [gameUserId]
    );

    return rows[0];
  },

  async removeFromInventory(gameId, gameUserId, itemName) {
    await pool.query(
      `
    UPDATE game_users
    SET inventory = ARRAY_REMOVE(inventory, $1)
    WHERE game_users.game_user_id = $2
    AND game_users.game_id = $3
    RETURNING *;
    `,
      [itemName, gameUserId, gameId]
    );

    const { rows } = await pool.query(
      `
        SELECT 
            inventory 
        FROM 
            game_users
        WHERE 
            game_users.game_user_id = $1
        `,
      [gameUserId]
    );

    return rows[0];
  },
};
