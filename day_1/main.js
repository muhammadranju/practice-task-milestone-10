require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { ObjectId } = require("mongodb");
const morgan = require("morgan");

const { dbConnection, client } = require("./DB");
dbConnection();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Specific frontend origin
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const database = client.db("PhDB");
const usersColl = database.collection("users");

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await usersColl.findOne({ _id: new ObjectId(id) });

    console.log(result);
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Invalid ID format or server error" });
  }
});

app.get("/users", async (req, res) => {
  const result = await usersColl.find().sort({ _id: -1 }).toArray();

  return res.send(result);
});

app.post("/users", async (req, res) => {
  const user = req.body;
  const result = await usersColl.insertOne(user);
  return res.send(result);
});

app.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const result = await usersColl.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    return res.send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Invalid ID format or server error" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const result = await usersColl.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    return res.send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Invalid ID format or server error" });
  }
});

app.listen(3000, () => {
  console.log("Example app listening on port http://localhost:3000");
});
