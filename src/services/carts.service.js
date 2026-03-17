import CartRepository from "../repositories/carts.repository.js"
import ProductRepository from "../repositories/products.repository.js"
import TicketRepository from "../repositories/ticket.repository.js"
import crypto from "crypto"

const cartRepository = new CartRepository()
const productRepository = new ProductRepository()
const ticketRepository = new TicketRepository()

export default class CartService {

  async getCarts() {
    return await cartRepository.getCarts()
  }

  async getCartById(id) {
    return await cartRepository.getCartById(id)
  }

  async purchaseCart(cartId, userEmail) {

    const cart = await cartRepository.getCartById(cartId)

    if (!cart) throw new Error("Carrito no encontrado")

    let total = 0
    let purchasedProducts = []
    let notPurchasedProducts = []

    for (const item of cart.products) {

      const product = await productRepository.getProductById(item.product)

      if (!product) {
        notPurchasedProducts.push(item)
        continue
      }

      if (product.stock < item.quantity) {
        notPurchasedProducts.push(item)
        continue
      }

      product.stock -= item.quantity
      await productRepository.updateProduct(product._id, product)

      total += product.price * item.quantity

      purchasedProducts.push(item)
    }

    await cartRepository.updateCart(cartId, {
      products: notPurchasedProducts
    })

    let ticket = null

    if (purchasedProducts.length > 0) {
      ticket = await ticketRepository.create({
        code: crypto.randomUUID(),
        purchase_datetime: new Date(),
        amount: total,
        purchaser: userEmail
      })
    }

    return {
      status: "success",
      ticket,
      purchasedProducts,
      notPurchasedProducts
    }
  }
}