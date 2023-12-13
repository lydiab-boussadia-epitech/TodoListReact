import {MongoClient, ServerApiVersion} from "mongodb"
const uri = "mongodb+srv://lydiaboussadia:Karima-202222022@cluster0.dubbszr.mongodb.net/?retryWrites=true&w=majority"

export const client = new MongoClient(uri,{serverApi:{version:ServerApiVersion.v1, strict:true, deprecationErrors: true}});
export const run = async () => {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("ToDoList").command({ping: 1});
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}