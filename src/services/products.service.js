import ProductRepository from "../repositories/products.repository.js"

const productRepository = new ProductRepository()

export default class ProductService {

 async getProducts(){
  return await productRepository.getProducts()
 }

 async getProductById(id){
  return await productRepository.getProductById(id)
 }

 async createProduct(product){

  if(!product.title){
   throw new Error("Product must have title")
  }

  return await productRepository.createProduct(product)
 }

 async updateProduct(id,data){
  return await productRepository.updateProduct(id,data)
 }

 async deleteProduct(id){
  return await productRepository.deleteProduct(id)
 }

}