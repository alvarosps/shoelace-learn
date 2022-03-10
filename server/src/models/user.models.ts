import { IUser } from "../types/user.types"
import { model, Schema } from "mongoose"

const userSchema: Schema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
})

export default model<IUser>("User", userSchema)