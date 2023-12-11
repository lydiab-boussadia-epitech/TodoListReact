import {ObjectId} from "mongodb"


export const createTodo = async (client, newListing) => {
    const result = await client.db("ToDoList").collection("ToDoListCollection").insertOne(newListing)
    console.log(result.insertedId)
}
export const getAllTodo = async (client) => {
    const result = await client.db("ToDoList").collection("ToDoListCollection").find({}).toArray();
    return result
}

export const getOneTodo = async (client, id) => {
    console.log(id)
    const result = client.db("ToDoList").collection("ToDoListCollection").find({"_id": new ObjectId(id)}).toArray();
    console.log("result")
    console.log(result)
    return result
}
export const updateTodo = async (client, id, newListing) => {
    console.log(newListing, id)
    const result = await client.db("ToDoList").collection("ToDoListCollection").updateOne({"_id": new ObjectId(id)}, {$set: {"name": newListing.name}}, {upsert: true})
    console.log(result.insertedId)

}
export const deleteTodo = async (client, id) => {
    console.log("id", id)
    const result = await client.db("ToDoList").collection("ToDoListCollection").deleteOne({"_id": new ObjectId(id)})
    console.log(result.insertedId)

}
