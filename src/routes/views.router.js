import { Router } from "express";
import ProductsService from "../services/products.service.js";
import CartService from "../services/carts.service.js";

const router = Router();
const productsService = new ProductsService();
const cartService = new CartService();

router.get("/", (req, res) => {
  res.redirect("/products");
});

router.get("/products", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await productsService.getProducts({ page, limit });

    res.render("products", {
      products: result.docs,
      page: result.page,
      totalPages: result.totalPages,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/products/:pid", async (req, res) => {
  try {
    const product = await productsService.getProductById(req.params.pid);
    if (!product) return res.status(404).send("Producto no encontrado");

    res.render("productDetail", { product });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/carts/:cid", async (req, res) => {
  try {
    const cart = await cartService.getCartById(req.params.cid);
    if (!cart) return res.status(404).send("Carrito no encontrado");

    res.render("cart", { products: cart.products });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;