const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;



// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ousunhm.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   
    await client.connect();


    const productCollection = client.db('ProductDB').collection('products')


    app.get('/products', async(req, res)=>{
      const cursor = productCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })


app.get('/products/:brand', async(req, res)=>{
      const brand = req.params.brand;
      const query = {brand:(brand)}
      const cursor = productCollection.find(query);
      const result = await cursor.toArray(cursor)
      res.send(result);
    }) 

    

    app.post('/products', async(req,res)=>{
      const newProduct = req.body
      const result = await productCollection.insertOne(newProduct)
      res.send(result)
    })
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);










app.get('/', (req, res)=> {
    res.send('Future Tech is Running on Servrr')
})

app.listen(port, ()=>{
    console.log(`Future Tech is Running On Port: ${port}`)
})