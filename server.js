const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose
  .connect("mongodb://127.0.0.1:27017/pizzaDB1")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/pizzas", require("./routes/pizzaRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
