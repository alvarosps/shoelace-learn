import { ISchool } from "../types/school.types"
import { model, Schema } from 'mongoose'

const schoolSchema: Schema = new Schema(
    {
        name: {
            type: String
        },
        address: {
            type: String
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }
)

export default model<ISchool>("School", schoolSchema)