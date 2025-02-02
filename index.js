require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;

// PostgreSQL connection settings
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Process JSON requests
app.use(express.json());

// 📝 Retrieve the list of users
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

// 📝 Add a new user
app.post("/users", async (req, res) => {
  const { name, age } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *",
      [name, age]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
