const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

//const users = ['Maruf', 'Maya', "Tuku", 'Bushra'];
// Database Connection
const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true });

app.get('/products', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.find().limit(10).toArray((err, documents) => {
            if(err){
                console.log(err)
                res.status(500).send({message: err});
            }
            else{
                res.send(documents);
            }
        });
        client.close();
    });
});


app.post('/addProduct', (req, res) => {
    //save to database
    const product = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.insertOne(product, (err, result) => {
            if(err){
                console.log(err)
                res.status(500).send({message: err});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        client.close();
    });
})


app.get('/user/:id', (requset, response) => {
    const id = requset.params.id;
    const name = users[id];
    console.log(requset.query.sort);
    response.send({id, name});
})

const port = process.env.PORT || 4200
app.listen(port, () => console.log('Listing to port 3000'));