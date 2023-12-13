import {createTodo, deleteTodo, getAllTodo, getOneTodo, statusTodo, updateTodo} from "../controlleur/todolist.js";
import {client} from "../database/config.js";

export const router = (app) => {

    app.get('/', async function (req, res) {
        try {
            await getAllTodo(client).then((e) => {
                res.status(200).json(e)
            })
        } catch {
            res.status(500)
        }
    })

    app.get('/todo/', async function (req, res) {
        try {
            await getOneTodo(client, req.query.id).then((e) => {
                res.status(200).json(e)
            })
        } catch {
            res.status(500)
        }
    })

    app.post('/', function (req, res) {
        try {
            const result = createTodo(client,
                req.body
            )
            res.status(200).json(result)
        } catch {
            res.status(500)
        }
    })

    app.put('/', function (req, res) {
        try {
            if (!req.query) {
                return res.status(500)
            }
            const result = updateTodo(client, req.query.id,
                req.body
            )
            res.status(200).json(result)
        } catch {
            res.status(500)
        }
    })

    app.put('/status', function (req, res) {
        try {
            const result = statusTodo(client, req.query.id,
                req.body
            )
            res.status(200).json(result)
        } catch {
            res.status(500)
        }
    })

    app.delete('/', function (req, res) {
        try {
            const result = deleteTodo(client, req.query.id)
            res.status(200).json(result)
        } catch {
            res.status(500)
        }
    })
}
