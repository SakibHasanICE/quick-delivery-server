const express = require('express')
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors =require('cors');
require ('dotenv').config();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fhm17oo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
     try{ 
        const deliveryServices=client.db('services').collection('delivery')
         app.get('/services', async(req,res)=>{
            const query ={}
            const cursor=deliveryServices.find(query);
            const services=await cursor.toArray();
            res.send(services);
         }) 
    }

     finally{

     }
}
run().catch(err => console.error(err))

app.listen(port,()=>{
    console.log('working',port);
})