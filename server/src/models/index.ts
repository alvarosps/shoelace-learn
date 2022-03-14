import mongoose from "mongoose"
import userModel from './user.models'
import roleModel from './role.models'
mongoose.Promise = global.Promise

const db: any = {}
db.mongoose = mongoose
db.user = userModel
db.role = roleModel
db.ROLES = ["user", "admin", "moderator"]

export default db