import CartDAO from "../dao/mongo/carts.dao.js"

const cartDAO = new CartDAO()

export default class CartRepository {

 async getCarts(){
  return await cartDAO.readAll()
 }

 async getCartById(id){
  return await cartDAO.readOne({_id:id})
 }

 async createCart(cart){
  return await cartDAO.create(cart)
 }

 async updateCart(id,data){
  return await cartDAO.update(id,data)
 }

 async deleteCart(id){
  return await cartDAO.delete(id)
 }

}