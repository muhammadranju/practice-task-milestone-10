const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routers/router");

app.use(express.json());
app.use(cors());

app.use(router);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
  return next();
});

module.exports = app;
