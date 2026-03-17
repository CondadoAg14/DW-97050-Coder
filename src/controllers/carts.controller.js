import CartService from "../services/carts.service.js"

const cartService = new CartService()

export const getCartById = async (req, res) => {
 try {
  const { cid } = req.params
  const cart = await cartService.getCartById(cid)
  res.send(cart)
 } catch (error) {
  res.status(500).send({ error: error.message })
 }

}

export const purchaseCart = async (req, res) => {
 try {
  const { cid } = req.params
  const result = await cartService.purchaseCart(cid, req.user.email)
  res.send(result)
 } catch (error) {
  res.status(500).send({ error: error.message })
 }

}