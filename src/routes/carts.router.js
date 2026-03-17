import { Router } from "express"
import passport from "passport"
import { authorize } from "../middlewares/authorization.js"
import {
  getCarts,
  getCartById,
  purchaseCart
} from "../controllers/carts.controller.js"

const router = Router()

router.get(
  "/",
  passport.authenticate("current", { session: false }),
  authorize(["admin"]),
  getCarts
)

router.get("/:cid", getCartById)

router.post(
  "/:cid/purchase",
  passport.authenticate("current", { session: false }),
  authorize(["user"]),
  purchaseCart
)

export default router