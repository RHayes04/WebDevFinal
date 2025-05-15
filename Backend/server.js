import express from "express";
import cookieParser from "cookie-parser";
import mysql from "mysql2/promise";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Only needed if frontend is hosted separately
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving (images)
app.use("/images", express.static(path.join(__dirname, "images")));

// Serve React build (static site)
app.use(express.static(path.join(__dirname, "../client/build")));

// MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  queueLimit: 0,
});
const promisePool = pool;

// API key (simple protection for image list)
const API_KEY = process.env.API_KEY;

/* ---------------- API Routes ---------------- */

app.get("/products", async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT p.*, i.imageURL FROM Products AS p LEFT JOIN ImageMaster AS i USING (imageID)'
    );
    res.json({ products: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/images", async (req, res) => {
  const userKey = req.query.api_key;
  if (userKey !== API_KEY) {
    return res.status(401).json({ error: "Unauthorized. Invalid API key." });
  }

  try {
    const [images] = await promisePool.query("SELECT imageID, imageURL FROM ImageMaster");
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/image-url/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.json({ imageURL: "/images/default.png" });

  try {
    const [rows] = await promisePool.query(
      "SELECT imageURL FROM ImageMaster WHERE imageID = ?",
      [id]
    );
    const url = rows[0]?.imageURL || "/images/default.png";
    res.json({ imageURL: url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/new", async (req, res) => {
  const { name, price, description, imageID } = req.body;
  try {
    await promisePool.query(
      'INSERT INTO Products (prod_name, price, description, imageID) VALUES (?, ?, ?, ?)',
      [name, price, description, imageID]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/edit/:product_id", async (req, res) => {
  const prodID = req.params.product_id;
  try {
    const [rows] = await promisePool.query(
      'SELECT p.*, i.imageURL FROM Products AS p LEFT JOIN ImageMaster as i USING (imageID) WHERE p.product_id = ?',
      [prodID]
    );
    res.json({ product: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/edit", async (req, res) => {
  const { product_id, name, description, price, imageID } = req.body;

  try {
    await promisePool.query(
      `UPDATE Products SET prod_name = ?, price = ?, description = ?, imageID = ? WHERE product_id = ?`,
      [name, price, description, imageID, product_id]
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/delete", async (req, res) => {
  const { product_id } = req.body;
  try {
    await promisePool.query("DELETE FROM Products WHERE product_id = ?", [product_id]);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- Fallback for React ---------------- */

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

/* ---------------- Start Server ---------------- */

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
