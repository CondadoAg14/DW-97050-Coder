import mongoose from "mongoose"

const schema = new mongoose.Schema({

code:String,

purchase_datetime:{
type:Date,
default:Date.now
},

amount:Number,

purchaser:String

})

export default mongoose.model("tickets",schema)