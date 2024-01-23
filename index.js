const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.khqul4z.mongodb.net/?retryWrites=true&w=majority`;
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
    // await client.connect();
    const DataCollection = client.db("task-db").collection("property-all");
   
app.get("/allData", async (req, res) => {
    const result = await DataCollection.find().toArray();
    res.send(result);
  }); 

  app.get("/allData/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await DataCollection.findOne(query);
    res.send(result);
  });

  app.post("/homes", async (req, res) => {
    const newJobs = req.body;
    console.log(newJobs);
    const result = await DataCollection.insertOne(newJobs);
    res.send(result);
  });
  app.delete("/home/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await DataCollection.deleteOne(query);
    res.send(result);
  });
  app.put("/homeUpdated/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const option = { upsert: true };
    const HomeUpdate = req.body;
    const update = {
      $set: {
        name: HomeUpdate.name,
        address: HomeUpdate.address,
        phoneNumber: HomeUpdate.phoneNumber,
        city: HomeUpdate.city,
        description: HomeUpdate.description,
        bedrooms: HomeUpdate.bedrooms,
        bathrooms: HomeUpdate. bathrooms,
        room_size: HomeUpdate.room_size,
        picture: HomeUpdate.picture,
        availability_date: HomeUpdate.availability_date,
        rent_per_month: HomeUpdate.rent_per_month,
       
      },
    };
    const result = await DataCollection.updateOne(filter, update, option);
    res.send(result);
  });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Task is on");
});

app.listen(port, () => {
  console.log(`Uca  ${port}`);
});
