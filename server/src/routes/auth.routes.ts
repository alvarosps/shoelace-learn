import middlewares from '../middlewares'
import controller from '../controllers/auth.controller'
import { Request, Response } from 'express'

const authRoute = (app: any) => {
    app.use((req: Request, res: Response, next: any) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })

    app.post(
        "/api/auth/signup",
        [
            middlewares.verifySignUp.checkDuplicateUsernameOrEmail,
            middlewares.verifySignUp.checkRolesExisted
        ],
        controller.signup
    )

    app.post("/api/auth/signin", controller.signin)
}

export default authRoute