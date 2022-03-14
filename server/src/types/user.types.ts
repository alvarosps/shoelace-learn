import { Document } from "mongoose"

export interface IRoles extends Document {
    name: any
    type: string,
    ref: string
}

export interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    roles: Array<IRoles>
}