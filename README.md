## 1 create a table

### 1 check database

`psql -l`

### 2 enter in the existing database

`psql -U <user name> -d <database name>`

### 3 create a database

`CREATE DATABASE sample;`

### 4 connect to the database

`\c sample`

### 5 check the database

`\l`

### 6 create a table

```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL
);
```

### 7 check the table

`\dt`

### 8 confirm the contents

`SELECT * FROM users;`

## 2 create a server

### 1 use express

```
const express = require("express");
const app = express();
```

### 2 use express.json

`app.use(express.json());`

### 3 listen

`app.listen(port, () => {});`

## 3 create a pool

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

## 4 get user list

### 1 create get outline

`app.get("/users", async (req, res) => {});`

### 2 create a query outline

```
const result = await pool.query("");
```

### 3 set the SQL statement

`SELECT * FROM users`

### 4 response

`res.json(result.rows);`

### 5 error

```
console.error(err);
res.status(500).send("An error occurred");
```

## 4 add user

### 1 create a post outline

`app.post("/users", async (req, res) => {});`

### 2 create a query outline

```
const { name, age } = req.body;
const result = await pool.query("",);
```

### 3 set the SQL statement

`INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *`  
`[name, age]`

### 4 response

`res.status(201).json(result.rows[0]);`

### 5 error

`res.status(500).send("An error occurred");`

## 5 check

### 1 get

`curl -X GET http://localhost:3000/users`

### 2 post

`curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name": "test1", "age": 30}'`

### 3 drop the database

`psql -U ytakahashi -d postgres`

`DROP DATABASE sample;`
