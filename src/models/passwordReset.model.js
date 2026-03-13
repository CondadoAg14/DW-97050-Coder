import mongoose from "mongoose"

const schema = new mongoose.Schema({

email:String,

token:String,

expires:Date

})

export default mongoose.model("password_resets",schema)