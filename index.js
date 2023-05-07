const express = require("express");
const cors = require("cors");
const routes = require("./src/routes");
const http = require("http");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.json({ type: "*/*" }));
app.use(cors());

//routes---------------------
app.use("/", routes);

//server running ---------------------
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});


module.exports = server; // <--- exporta la app
