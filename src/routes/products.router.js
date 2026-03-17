import { Router } from "express";
import passport from "passport";
import { authorize } from "../middlewares/authorization.js";
import productsController from "../controllers/products.controller.js";

const router = Router();

router.get("/", productsController.getAllProducts);
router.post(
  "/",
  passport.authenticate("current", { session: false }),
  authorize(["admin"]),
  productsController.createProduct
);

export default router;