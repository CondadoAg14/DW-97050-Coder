import CartModel from "../../models/cart.model.js"

export default class CartDAO {

 async create(cart){
  return await CartModel.create(cart)
 }

 async readAll(filter={}){
  return await CartModel.find(filter)
 }

 async readOne(filter){
  return await CartModel.findOne(filter)
 }

 async update(id,data){
  return await CartModel.findByIdAndUpdate(id,data,{new:true})
 }

 async delete(id){
  return await CartModel.findByIdAndDelete(id)
 }

}