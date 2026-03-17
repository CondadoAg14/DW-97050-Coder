import ProductRepository from "../repositories/products.repository.js"

const productRepository = new ProductRepository()

export default class ProductService {

 async getProducts({ page = 1, limit = 10 } = {}) {
  return await productRepository.getProducts({ page, limit })
 }

 async getProductById(id) {
  return await productRepository.getProductById(id)
 }

 async createProduct(product) {

  if (!product.title) {
   throw new Error("Product must have title")
  }

  if (!product.price) {
   throw new Error("Product must have price")
  }

  if (product.stock == null) {
   throw new Error("Product must have stock")
  }

  return await productRepository.createProduct(product)
 }

 async updateProduct(id, data) {
  return await productRepository.updateProduct(id, data)
 }

 async deleteProduct(id) {
  return await productRepository.deleteProduct(id)
 }

}