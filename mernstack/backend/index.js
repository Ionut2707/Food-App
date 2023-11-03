const express = require("express");
const mongoose = require("mongoose");
const connectDB = require('./db')
const createUser = require('../backend/Routes/CreateUser')
const createFood = require("../backend/Routes/CreateFood")
const cors = require('cors')
require('dotenv').config()

connectDB()
const app = express();
const port = 5001;

app.get("/", (req, res) => {
  res.send( "World");
});


app.use(cors());

app.use(express.json());

app.use("/api/",createFood)

app.use("/api/",createUser)

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
