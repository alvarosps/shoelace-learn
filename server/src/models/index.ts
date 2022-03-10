import mongoose from "mongoose"

mongoose.Promise = global.Promise

const db: any = {}
db.mongoose = mongoose
db.user = require("./user.models")
db.role = require("./role.models")
db.ROLES = ["user", "admin", "moderator"]

export default db