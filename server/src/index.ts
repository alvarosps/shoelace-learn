import express, { Express } from 'express'
import { Request, Response } from 'express'
import cors from 'cors'
import db from './models/index'
import dbConfig from './config/db.config'
import middlewares from './middlewares'
import authController from './controllers/auth.controller'
import userController from './controllers/user.controller'
import schoolController from './controllers/school.controller'

const Role = db.role;

const dbConnectionString = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`
console.log(dbConnectionString)
db.mongoose
    .connect(dbConnectionString, {
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

const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req: Request, res: Response, next: any) => {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    )
    next()
})

app.post(
    "/api/auth/signup",
    [
        middlewares.verifySignUp.checkDuplicateUsernameOrEmail,
        middlewares.verifySignUp.checkRolesExisted
    ],
    authController.signup
)

app.post("/api/auth/login", authController.signin)

app.get('/api/test/all', userController.allAccess)

app.get('/api/test/user', [middlewares.authJwt.verifyToken, userController.userBoard])

app.get('/api/schools', [middlewares.authJwt.verifyToken, schoolController.getSchools])

app.put('/api/schools/:id', [middlewares.authJwt.verifyToken, schoolController.updateSchool])

app.delete('/api/schools/:id', [middlewares.authJwt.verifyToken, schoolController.deleteSchool])

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