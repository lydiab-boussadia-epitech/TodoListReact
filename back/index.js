import express from "express"
import cors from "cors"
let app = express();
const port = 3000
import bodyParser from "express";
import {run} from "./database/config.js";
import {router} from "./router/routes.js";

app.use(bodyParser.json({limit:"505mb"}))

run().catch(console.dir)

app.use(cors())

router(app)

app.listen(port, ()=> {
    console.log('app listening on port '+port)
})