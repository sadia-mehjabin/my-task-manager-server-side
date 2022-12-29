const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');

require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
app.use(express.json())
app.use(cors())

app.get('/', async(req, res) => {
    res.send('hello')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uzz7izn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if(!authHeader){
        res.status(403).send('unauthorized')
    }
    const token = authHeader.split(' ')[1];
    // console.log(token)
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, decoded){
        if(err){
            return res.status(403).send({message: 'accesss forbidden'})
        }
        req.decoded = decoded;
        next()
    })
}

async function run(){
    try{
        const tasks = client.db('doctor').collection('taskCollection');
        
    }
    finally{

    }
}
run().catch(console.log)

app.listen(port, () => {
    console.log(`'hello '${port}`)
})
