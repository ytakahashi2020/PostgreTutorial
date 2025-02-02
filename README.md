psql -l

psql -U ytakahashi -d postgres

`postgres=# CREATE DATABASE sample;`

`\c sample`

`\l`

```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL
);
```

`\dt`

`SELECT * FROM users;`

## 1 create a pool

### 1 create a dotenv file

```
DB_HOST=localhost
DB_USER=ytakahashi
DB_PASSWORD=
DB_NAME=sample
DB_PORT=5432
```

### 2 import

```
const { Pool } = require("pg");
require("dotenv").config();
```

### 3 create a pool

```
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
```

## 2 parse request

### 1 use express

```
const express = require("express");
const app = express();
```

### 2 use express.json

`app.use(express.json());`

## 3 get user list

### 1

`app.get("/users", async (req, res) => {});`

### 2

```
const result = await pool.query("");
```

### 3

`SELECT * FROM users`

### 4

`res.json(result.rows);`

### 5

```
console.error(err);
res.status(500).send("An error occurred");
```

## 4 add user

### 1

`app.post("/users", async (req, res) => {});`

### 2

```
const { name, age } = req.body;
const result = await pool.query("",);
```

### 3

`INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *`
`[name, age]`

### 4

`res.status(201).json(result.rows[0]);`

### 5

`res.status(500).send("An error occurred");`

## 5

### 1

`app.listen(port, () => {});`

### 2

`` console.log(`🚀 Server is running at http://localhost:${port}`);``
