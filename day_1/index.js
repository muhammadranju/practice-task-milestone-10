const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const findData = (path) => {
  const data = fs.readFileSync(path, "utf8");
  const lines = data.split("\n").filter((line) => line.trim() !== "");
  const readJson = lines.map((line) => JSON.parse(line));
  return readJson;
};

const uri =
  "mongodb+srv://Ranju:ranju123@cluster0.jzvet.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  try {
    const user = findData("./data.text");

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error reading or parsing file:", error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/", (req, res) => {
  const { name, email, phone } = req.body;
  const id = uuidv4();

  const userData = {
    id,
    name,
    email,
    phone,
  };

  if (!fs.existsSync("./data.text")) {
    fs.writeFileSync("./data.text", "");
  }
  const users = findData("./data.text", email);

  const findUser = users.find((user) => user.email === email);

  if (findUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const createJson = JSON.stringify(userData);
  try {
    const writeData = fs.appendFileSync("./data.text", createJson + "\n");
    console.log(writeData);

    return res
      .status(201)
      .json({ message: "Data appended successfully", userData });
  } catch (error) {
    console.error("Error writing to file:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
