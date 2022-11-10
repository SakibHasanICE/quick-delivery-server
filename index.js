const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fhm17oo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const deliveryServices = client.db("services").collection("delivery");
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = deliveryServices.find(query);
      const services = await cursor.limit(3).toArray();
      res.send(services);
    });
    app.get("/", async (req, res) => {
      const query = {};
      const cursor = deliveryServices.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
    app.get("/service/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await deliveryServices.findOne(query);
      res.send(service);
    });
  } 
  finally {
  }
}
run().catch((err) => console.error(err));
app.listen(port, () => {
  console.log("working", port);
});
