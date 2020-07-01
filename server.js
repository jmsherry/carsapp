const express = require("express");
const bodyParser = require("body-parser");
// TODO: Add db driver (pg)
const cors = require("cors");

const app = express();
const apiRoot = "/api/";
const version = "v1";
const fullAPIRoot = apiRoot + version;

const {
  PORT = 3333,
  // MONGODB_URI = "mongodb://localhost/cars_jump",
} = process.env;

app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// enable cors
app.use(cors());

// TODO: Connect Database

//TODO: Create a read (GET) route

app.get(`${fullAPIRoot}/cars/:id?`, (req, res) => {
  const { id } = req.params;
});

// GET /cars - get all the cars
//--- /cars/Bugatti%20Veyron <-- other ways of doing it
// GET /cars/:id

// /cars
// /cars/78asd6f8s6d9

//TODO: Create a create (POST) route
app.post(`${fullAPIRoot}/cars/`, (req, res) => {
  const carData = req.body;
});

//TODO: Create a update (PUT) route
app.put(`${fullAPIRoot}/cars/:id`, (req, res) => {
  const updateData = req.body;
  console.log(`Updating ${req.params.id}`, updateData);
});

//TODO: Create a delete (DELETE) route
app.delete(`${fullAPIRoot}/cars/:id`, (req, res) => {
  console.log("carToBeDeleted", req.params.id);
});

// 404 Route
app.all("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);
});
