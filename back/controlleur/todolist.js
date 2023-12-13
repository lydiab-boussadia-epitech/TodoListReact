import {ObjectId} from "mongodb"

export const createTodo = async (client, newListing) => {
    newListing.status = false
    return await client.db("ToDoList").collection("ToDoListCollection").insertOne(newListing)
}

export const getAllTodo = async (client) => {
    return await client.db("ToDoList").collection("ToDoListCollection").find({}).toArray()
}

export const getOneTodo = async (client, id) => {
    return client.db("ToDoList").collection("ToDoListCollection").find({"_id": new ObjectId(id)}).toArray()
}

export const updateTodo = async (client, id, newListing) => {
    return await client.db("ToDoList").collection("ToDoListCollection").updateOne({"_id": new ObjectId(id)}, {
        $set: {
            "name": newListing.name,
            "description": newListing.description
        }
    }, {upsert: true})
}

export const statusTodo = async (client, id, newListing) => {
    return await client.db("ToDoList").collection("ToDoListCollection").updateOne({"_id": new ObjectId(id)}, {$set: {"status": newListing.status}}, {upsert: true})
}

export const deleteTodo = async (client, id) => {
    return await client.db("ToDoList").collection("ToDoListCollection").deleteOne({"_id": new ObjectId(id)})
}