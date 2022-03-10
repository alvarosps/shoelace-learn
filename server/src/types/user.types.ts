import { Document } from "mongoose"

export interface IRoles extends Document {
    type: String,
    ref: String
}

export interface IUser extends Document {
    username: String,
    email: String,
    password: String,
    roles: Array<IRoles>
}