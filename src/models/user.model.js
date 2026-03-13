import mongoose from "mongoose"

const schema = new mongoose.Schema({

first_name:String,

last_name:String,

email:{
type:String,
unique:true
},

password:String,

role:{
type:String,
default:"user"
}

})

export default mongoose.model("users",schema)