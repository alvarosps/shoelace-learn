import express, { Express } from 'express'
import { Request, Response } from 'express'
import cors from 'cors'
import db from './models/index'
import dbConfig from './config/db.config'

const Role = db.role;

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connected to mongoose")
        initial()
    })
    .catch((err: any) => {
        console.log("Connection error ", err)
        process.exit()
    })

const app: Express = express()

const corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 8080;

app.get('/', (req: Request, res: Response) => {
    res.send({
        message: 'Server running'
    })
})

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`)
})

const initial = () => {
    Role.estimatedDocumentCount((err: any, count: Number) => {
        if (!err && count === 0) {
        new Role({
            name: "user"
        }).save((err: any) => {
            if (err) {
            console.log("error", err);
            }
            console.log("added 'user' to roles collection");
        });
        new Role({
            name: "moderator"
        }).save((err: any) => {
            if (err) {
            console.log("error", err);
            }
            console.log("added 'moderator' to roles collection");
        });
        new Role({
            name: "admin"
        }).save((err: any) => {
            if (err) {
            console.log("error", err);
            }
            console.log("added 'admin' to roles collection");
        });
        }
    });
}