import UserModel from "../../models/user.model.js"

export default class UserDAO {

 async create(user){
  return await UserModel.create(user)
 }

 async readAll(filter = {}){
  return await UserModel.find(filter)
 }

 async readOne(filter){
  return await UserModel.findOne(filter)
 }

 async update(id,data){
  return await UserModel.findByIdAndUpdate(id,data,{new:true})
 }

 async delete(id){
  return await UserModel.findByIdAndDelete(id)
 }

}