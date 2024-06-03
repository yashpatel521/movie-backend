// Imports
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database/db");
const userRouter = require("./routes/user");
const movieRouter = require("./routes/movie");
const actorRouter = require("./routes/actor");
const genreRouter = require("./routes/genre");

// Create & Configure App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Create routes
app.get("/", (req, res) => {
  res.send("Welcome to the  Fantastic 4 Project :)");
});

// Import Routes
app.use("/user", userRouter);
app.use("/movie", movieRouter);
app.use("/actor", actorRouter);
app.use("/genre", genreRouter);

// 404 & Error Handling
app.all("*", (req, res) => {
  res.status(404).json({
    msg: "Something was wrong with your request",
    reqMethod: req.method,
    reqPath: req.path,
    reqQuery: req.query,
    reqBody: req.body,
  });
});

const errorHandler = (err, req, res) => {
  console.error(err);
  res.status(500).json({
    msg: "Something went wrong",
    error: err.message,
  });
};

app.use(errorHandler);
module.exports = app;
