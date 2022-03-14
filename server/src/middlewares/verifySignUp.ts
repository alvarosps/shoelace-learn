import db from '../models'
import { Response, Request } from 'express'

const ROLES = db.ROLES
const User = db.user

const checkDuplicateUsernameOrEmail = (req: Request, res: Response, next: any) => {
    //Username check for duplication
    User.findOne({
        username: req.body.username
    }).exec((err: any, user: any) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        if (user) {
            res.status(400).send({ message: 'Failed! Username is already in use!' })
            return
        }
        User.findOne({
            email: req.body.email
        }).exec((err: any, user: any) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            }
            if (user) {
                res.status(400).send({ message: 'Failed! Email is already in use!' })
                return
            }
            next()
        })
    })
}

const checkRolesExisted = (req: Request, res: Response, next: any) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist!`
                })
                return
            }
        }
    }
    next()
}

export default {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
}