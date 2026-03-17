import CartRepository from "../repositories/carts.repository.js"
import ProductRepository from "../repositories/products.repository.js"

const cartRepository = new CartRepository()
const productRepository = new ProductRepository()

export default class CartService {

 async getCartById(id) {
  return await cartRepository.getCartById(id)
 }

 async purchaseCart(cartId) {

  const cart = await cartRepository.getCartById(cartId)

  let total = 0
  let purchasedProducts = []

  for (const item of cart.products) {

   const product = await productRepository.getProductById(item.product)

   if (!product) continue

   if (product.stock < item.quantity) {
    continue
   }

   product.stock -= item.quantity

   await productRepository.updateProduct(product._id, product)

   total += product.price * item.quantity

   purchasedProducts.push(item)

  }
  
  await cartRepository.updateCart(cartId, { products: [] })

  return {
   amount: total,
   products: purchasedProducts
  }

 }

}