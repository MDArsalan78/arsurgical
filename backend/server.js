const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("../public"));

const DB_PATH = "./db.json";

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH));
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Get all products
app.get("/api/products", (req, res) => {
  const db = readDB();
  res.json(db.products);
});

// Add product (Admin)
app.post("/api/products", (req, res) => {
  const db = readDB();
  const newProduct = { id: uuidv4(), ...req.body };
  db.products.push(newProduct);
  writeDB(db);
  res.json(newProduct);
});

// Delete product
app.delete("/api/products/:id", (req, res) => {
  const db = readDB();
  db.products = db.products.filter(p => p.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("🚀 Server running: http://localhost:3000");
});
