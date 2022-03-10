import express, { Express } from 'express'
import { Request, Response } from 'express'

const app: Express = express()

const {
    PORT = 3000,
} = process.env

app.get('/', (req: Request, res: Response) => {
    res.send({
        message: 'Server running'
    })
})

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`)
})