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

// prettier-ignore
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1,
});

const usedProductsBrand = client.db("usedProductsSell").collection("brands");
const productDetails = client
  .db("usedProductsSell")
  .collection("productsDetails");

app.get("/brands", async (req, res) => {
  try {
    const brandsProducts = await usedProductsBrand.find({}).toArray();
    res.send(brandsProducts);
  } catch {}
});

app.get("/brands/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { brandId: ObjectId(id) };
    const result = await productDetails.find(query).toArray();
    res.send(result);
  } catch {}
});

app.get("/productsDetails/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await productDetails.findOne(query);
    res.send(result);
  } catch {}
});

app.get("/", (req, res) => {
  res.send("Resale Web Server is Running...");
});

app.listen(port, () => {
  console.log(`Resale Web Server Running on: ${port}`);
});
