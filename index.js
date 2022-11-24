const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a8e9r20.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// prettier-ignore
const usedProductsBrand = client.db("usedProductsSell").collection("brands");
// prettier-ignore
const Hp = client.db("usedProductsSell").collection("productsDetails");
const dell = client.db("usedProductsSell").collection("dell");
const acer = client.db("usedProductsSell").collection("acer");

app.get("/brands", async (req, res) => {
  try {
    const brandsProducts = await usedProductsBrand.find({}).toArray();
    res.send(brandsProducts);
  } catch {}
});

// hp data load
app.get("/Hp/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { brandId: ObjectId(id) };
    const result = await Hp.find(query).toArray();
    res.send(result);
  } catch {}
});

// dell data load
app.get("/Dell/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { brandId: ObjectId(id) };
    const result = await dell.find(query).toArray();
    res.send(result);
  } catch {}
});

// acer data load
app.get("/Acer/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { brandId: ObjectId(id) };
    const result = await acer.find(query).toArray();
    res.send(result);
  } catch {}
});

app.get("/", (req, res) => {
  res.send("Resale Web Server is Running...");
});

app.listen(port, () => {
  console.log(`Resale Web Server Running on: ${port}`);
});
