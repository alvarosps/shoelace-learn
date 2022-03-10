import { IRole } from "../types/role.types"
import { model, Schema } from "mongoose"

const roleSchema: Schema = new Schema({
    name: {
        type: String
    }
})

export default model<IRole>("Role", roleSchema)