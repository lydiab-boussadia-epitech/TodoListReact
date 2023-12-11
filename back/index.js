import express from "express"
import cors from "cors"
let app = express();
const port = 3000

app.use(bodyParser.json({limit:"505mb"}))


import {MongoClient,  ServerApiVersion} from "mongodb"
import {createTodo,getAllTodo, updateTodo, deleteTodo} from "./controlleur/todolist.js";

import bodyParser from "express";
const uri = "mongodb+srv://lydiaboussadia:Karima-202222022@cluster0.dubbszr.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri,  {

      tls: true, serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

const run = async () => {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect()
        // Send a ping to confirm a successful connection
        //await client.db("ToDoList").collection("ToDoListCollection")
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch(error){console.error(error)}
}

run().catch(console.dir)

app.use(cors())

app.get('/', async function (req, res) {
    try {
        //const result = getAllTodo(client)
        await getAllTodo(client).then((e) => {

        res.status(200).json(e)
        })
    } catch {
        res.status(500)
    }
})

app.post('/', function(req, res){
    try{
   const result = createTodo(client,
        req.body
    )
    res.status(200).json(result)
}catch{res.status(500)}})

app.put('/', function(req, res){
    try{
   const result = updateTodo(client, req.body._id,
        req.body
    )
    res.status(200).json(result)
}catch{res.status(500)}})

app.delete('/', function(req, res){
    try{
   const result = deleteTodo(client, req.query.id)
    res.status(200).json(result)
}catch{res.status(500)}})











app.listen(port, ()=> {
    console.log('app listening on port '+port)
})
