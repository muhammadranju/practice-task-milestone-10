require("dotenv").config();
const http = require("http");
const app = require("./app");
const connectDB = require("./DB/connectionDB");

connectDB();
const server = http.createServer(app);

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
