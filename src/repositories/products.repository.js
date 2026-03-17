import ProductDAO from "../dao/mongo/products.dao.js"

const productDAO = new ProductDAO()

export default class ProductRepository {

 async getProducts(){
  return await productDAO.readAll()
 }

 async getProductById(id){
  return await productDAO.readOne({_id:id})
 }

 async createProduct(product){
  return await productDAO.create(product)
 }

 async updateProduct(id,data){
  return await productDAO.update(id,data)
 }

 async deleteProduct(id){
  return await productDAO.delete(id)
 }

}