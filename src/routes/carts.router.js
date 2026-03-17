import { Router } from "express"

import {
 getCartById,
 purchaseCart
} from "../controllers/carts.controller.js"

const router = Router()

router.get("/:cid", getCartById)

router.post("/:cid/purchase", purchaseCart)

export default router