import { Router } from "express"
import passport from "passport"
import { authorize } from "../middlewares/authorization.js"

import {
  getCartById,
  purchaseCart
} from "../controllers/carts.controller.js"

const router = Router()

router.get("/:cid", getCartById)

router.post(
  "/:cid/purchase",
  passport.authenticate("current", { session: false }),
  authorize(["user"]),
  purchaseCart
)

export default router