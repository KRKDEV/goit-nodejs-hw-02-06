require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const usersRouter = require("./routes/api/users");
const authToken = require("./authentication");

const contactsRouter = require("./routes/api/contacts");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", function () {
  console.log("Database connection successful");
});

db.on("error", function (err) {
  console.error("Database connection error:", err);
  process.exit(1);
});

process.on("exit", function (code) {
  if (code === 1) {
    console.error("Application closed with error");
  }
});

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", authToken, contactsRouter);
app.use("/api/users", usersRouter);

app.use(express.static("public"));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.message === "Contact not found") {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(500).json({ message: err.message });
  }
});

module.exports = app;
