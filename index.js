const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
//MIADLEWERE


app.use(
  cors({
    origin: ["http://localhost:5173","https://mobarak-shop.netlify.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cors())


const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@robiul.13vbdvd.mongodb.net/?retryWrites=true&w=majority`;

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
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const usersInfocollection=client.db('mobarak-shop').collection('users')
    const ProductsCollection=client.db('mobarak-shop').collection('products')
    const cartsCollection=client.db('mobarak-shop').collection('cart')
    const blogsCollection=client.db('mobarak-shop').collection('blogs')
    const feedbackCollection=client.db('mobarak-shop').collection('feedbacks')


    ///////////////////////////////////////////////////////////////////////////
    //                         user data
    ///////////////////////////////////////////////////////////////////////////

    app.get('/users', async (req, res) => {
      const result = await usersInfocollection.find().toArray();
      res.send(result);
    });

    app.post('/users', async (req, res) => {
      const user = req.body;
      const query = { email: user?.email }
      const existingUser = await usersInfocollection.findOne(query);

      if (existingUser) {
        return res.send({ message: 'user already exists' })
      }

      const result = await usersInfocollection.insertOne(user);
      res.send(result);
    });

    app.get('/users/admin/:email',  async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        res.send({ admin: false })
      }

      const query = { email: email }
      const user = await usersInfocollection.findOne(query);
      const result = { admin: user?.role === 'admin' }
      res.send(result);
    })

 
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await usersInfocollection.deleteOne(filter);
      res.send(result);
    });

    app.patch("/users/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedoc = {
        $set: {
          role: 'admin'
        },
      };
      const result = await usersInfocollection.updateOne(filter, updatedoc);
      res.send(result);
    });

    //---------------------------------------------------------------
    //                  products 
    //---------------------------------------------------------------
    
    app.post('/products',async(req,res)=>{
      const data=req.body 
      const result=await ProductsCollection.insertOne(data)
      res.send(result)
    })

    app.get('/products',async(req,res)=>{
      const result=await ProductsCollection.find().toArray()
      res.send(result)
    })
    app.get('/productDetails/:id',async(req,res)=>{
      const id=req.params.id 
      const filter={ _id: new ObjectId(id)}
      const result=await ProductsCollection.findOne(filter)
      res.send(result)
    })

    app.get('/products/:id',async(req,res)=>{
      const id=req.params.id
      const filter={ _id: new ObjectId(id)}
      const result=await ProductsCollection.findOne(filter)
      res.send(result)
    })

    app.delete("/product/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await ProductsCollection.deleteOne(filter);
      res.send(result);
    });

        //---------------------------------------------------------------
    //                  cart 
    //---------------------------------------------------------------
    
    app.post('/cart',async(req,res)=>{
      const data=req.body 
      const result=await cartsCollection.insertOne(data)
      res.send(result)
    })

    app.get('/cart',async(req,res)=>{
      const result=await cartsCollection.find().toArray()
      res.send(result)
    })

    /////////////////////////////////////////////////////////////////////////
    //                        blogs info part
    ////////////////////////////////////////////////////////////////////////

    app.post("/blogs", async (req, res) => {
      const data = req.body;
      const result = await blogsCollection.insertOne(data);
      res.send(result);
    });

    app.get("/blogs", async (req, res) => {
      const result = await blogsCollection.find().toArray();
      res.send(result);
    });

    app.get("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await blogsCollection.findOne(filter);
      res.send(result);
    });

    app.patch("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const body = req.body;
      const updatedoc = {
        $set: {
          title: body.title,
          description: body.description,
        },
      };
      const result = await blogsCollection.updateOne(filter, updatedoc);
      res.send(result);
    });

    app.delete("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await blogsCollection.deleteOne(filter);
      res.send(result);
    });
    /////////////////////////////////////////////////////////////////////////
    //                        feedb ack info part
    ////////////////////////////////////////////////////////////////////////

    app.post("/feedbacks", async (req, res) => {
      const data = req.body;
      const result = await feedbackCollection.insertOne(data);
      res.send(result);
    });

    app.get("/feedbacks", async (req, res) => {
      const result = await feedbackCollection.find().toArray();
      res.send(result);
    });

    app.get("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await blogsCollection.findOne(filter);
      res.send(result);
    });

    app.patch("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const body = req.body;
      const updatedoc = {
        $set: {
          title: body.title,
          description: body.description,
        },
      };
      const result = await blogsCollection.updateOne(filter, updatedoc);
      res.send(result);
    });

    app.delete("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await blogsCollection.deleteOne(filter);
      res.send(result);
    });


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("hello canteen");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


