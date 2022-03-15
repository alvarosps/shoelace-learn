import { ISchool } from "../types/school.types"
import { model, Schema } from 'mongoose'

const schoolSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String
        },
        user: {
            type: String,
            required: true
        }
    }
)

export default model<ISchool>("School", schoolSchema)