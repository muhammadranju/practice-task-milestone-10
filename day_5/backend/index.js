require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const { dbConnection, client } = require("./db/connectionDB");
const app = express();
dbConnection();

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

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users", async (req, res) => {
  const result = await usersColl.find().sort({ _id: -1 }).toArray();
  return res.status(200).json({
    status: 200,
    success: true,
    message: "User fetched successfully",
    result,
  });
});

app.post("/users", async (req, res) => {
  const user = req.body;
  const result = await usersColl.insertOne(user);
  return res.status(201).json({
    status: 201,
    success: true,
    message: "User added successfully",
    result,
  });
});

app.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const result = await usersColl.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    return res.status(202).json({
      status: 202,
      success: true,
      message: "User updated successfully",
      result,
    });
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

    return res.status(204).json({
      status: 204,
      success: true,
      message: "User deleted successfully",
      result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Invalid ID format or server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
