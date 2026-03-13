import mongoose from "mongoose"

const connectMongo = async ()=>{

try{

await mongoose.connect(process.env.MONGO_URI)

console.log("Mongo conectado")

}catch(error){

console.log(error)

}

}

export default connectMongo