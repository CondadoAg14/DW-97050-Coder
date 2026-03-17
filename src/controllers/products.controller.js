import ProductService from "../services/products.service.js"

const productService = new ProductService()

export const getProducts = async (req, res) => {

 try {

  const products = await productService.getProducts()

  res.status(200).send(products)

 } catch (error) {

  res.status(500).send({ error: error.message })

 }

}

export const getProductById = async (req, res) => {

 try {

  const { pid } = req.params

  const product = await productService.getProductById(pid)

  if (!product) {
   return res.status(404).send({ error: "Product not found" })
  }

  res.send(product)

 } catch (error) {

  res.status(500).send({ error: error.message })

 }

}

export const createProduct = async (req, res) => {

 try {

  const product = req.body

  const newProduct = await productService.createProduct(product)

  res.status(201).send(newProduct)

 } catch (error) {

  res.status(500).send({ error: error.message })

 }

}

export const updateProduct = async (req, res) => {

 try {

  const { pid } = req.params

  const data = req.body

  const updatedProduct = await productService.updateProduct(pid, data)

  res.send(updatedProduct)

 } catch (error) {

  res.status(500).send({ error: error.message })

 }

}

export const deleteProduct = async (req, res) => {

 try {

  const { pid } = req.params

  await productService.deleteProduct(pid)

  res.send({ message: "Product deleted" })

 } catch (error) {

  res.status(500).send({ error: error.message })

 }

}