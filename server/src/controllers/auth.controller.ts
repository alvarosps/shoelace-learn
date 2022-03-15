import config from '../config/auth.config'
import db from '../models'

const User = db.user
const Role = db.role

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { IUser } from '../types/user.types'
import { IRole } from '../types/role.types'

const signup =  (req: Request, res: Response) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    user.save((err: any, user: IUser) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        if (req.body.roles) {
            Role.find(
                {
                    name: { $in: req.body.roles }
                },
                (err: any, roles: IRole[]) => {
                    if (err) {
                        res.status(500).send({ message: err })
                        return
                    }
                    user.roles = roles.map(role => role._id)
                    user.save(err => {
                        if (err) {
                            res.status(500).send({ message: err })
                            return
                        }
                        res.send({ message: 'User was registered successfully' })
                    })
                }
            )
        } else {
            Role.findOne({ name: 'user' }, (err: any, role: IRole) => {
                if (err) {
                    res.status(500).send({ message : err })
                    return
                }
                user.roles = [role._id]
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err })
                        return
                    }
                    res.send({ message: 'User was registered successfully' })
                })
            })
        }
    })
}

const signin = (req: Request, res: Response) => {
    User.findOne({
        username: req.body.username
    }).populate('roles', '-__v')
    .exec((err: any, user: IUser) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        if (!user) {
            return res.status(404).send({ message: 'User not found' })
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: 'Invalid password!'
            })
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        })
        const authorities = []
        
        for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase())
        }

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        })
    })
}

export default {
    signin,
    signup
}