const fs = require("fs");
const pool = require("../lib/utils/pool");
const request = require("supertest");
const app = require("../lib/app");

describe("test inventory routes", () => {
  beforeEach(async () => {
    await pool.query(fs.readFileSync("./sql/setup.sql", "utf-8"));
    await pool.query(fs.readFileSync("./sql/inventory.test.sql", "utf-8"));
  });

  afterAll(() => {
    return pool.query.end();
  });

  it("allows a user to view their inventory via GET", async () => {
    const { rows } = await pool.query(`SELECT * FROM game_items`);

    const res = await request(app).get(
      `/view/${rows[0].game_id}/${rows[0].user_id}`
    );

    expect(res.body).toEqual({ inventory: ["key"] });
  });
});
