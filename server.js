const express = require("express");
const bodyParser = require("body-parser");
// TODO: Add db driver (pg)
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const apiRoot = "/api/";
const version = "v1";
const fullAPIRoot = apiRoot + version;

const {
  PORT = 3333,
  // MONGODB_URI = "mongodb://localhost/cars_jump",
} = process.env;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cars",
  port: 5432,
});

app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// enable cors
app.use(cors());

//TODO: Create a read (GET) route

app.get(`${fullAPIRoot}/cars/:id?`, (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  let query = "SELECT * FROM cars2";
  const SORT = " ORDER BY id ASC"
  if (id) {
    query += " WHERE id = $1";
  }
  query += SORT;
  console.log("query", query);
  pool.query(
    query,
    [id], (error, results) => {
      if (error) {
        // throw error;
        return res.status(500).send(error);
      }
      res.status(200).json(results.rows);
    }
  );
});

// GET /cars - get all the cars
//--- /cars/Bugatti%20Veyron <-- other ways of doing it
// GET /cars/:id

// /cars
// /cars/78asd6f8s6d9

//TODO: Create a create (POST) route
app.post(`${fullAPIRoot}/cars/`, (req, res) => {
  const { name, bhp } = req.body;
  pool.query(
    "INSERT INTO cars2 (name, bhp) VALUES ($1, $2)",
    [name, bhp],
    (error, results) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(201).send(results);
    }
  );
});

//TODO: Create a update (PUT) route
app.put(`${fullAPIRoot}/cars/:id`, (req, res) => {
  const updateData = req.body;
  console.log(`Updating ${req.params.id}`, updateData);
});

//TODO: Create a delete (DELETE) route
app.delete(`${fullAPIRoot}/cars/:id`, (req, res) => {
  console.log("carToBeDeleted", req.params.id);
  pool.query("DELETE FROM cars2 WHERE id = $1", [req.params.id], (error) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.status(200).send(`User deleted with ID: ${req.params.id}`);
  });
});

// 404 Route
app.all("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);
});
