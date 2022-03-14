import middlewares from "../middlewares"
import controller from "../controllers/user.controller"
import { Request, Response } from 'express'

const userRoute = (app: any) => {
    app.use((req: Request, res: Response, next: any) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        )
        next()
    })
    app.get('/api/test/all', controller.allAccess)
    app.get('/api/test/user', [middlewares.authJwt.verifyToken, controller.userBoard])
    app.get(
        '/api/test/mod',
        [middlewares.authJwt.verifyToken, middlewares.authJwt.isModerator],
        controller.moderatorBoard
    )
    app.get(
        '/api/test/admin',
        [middlewares.authJwt.verifyToken, middlewares.authJwt.isAdmin],
        controller.adminBoard
    )
}