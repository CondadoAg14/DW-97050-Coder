import {Router} from "express"
import passport from "passport"

import {authorize} from "../middlewares/authorization.js"

import {ProductModel} from "../models/product.model.js"

const router = Router()

router.get("/",async(req,res)=>{

const products = await ProductModel.find()

res.send(products)

})

router.post(
"/",
passport.authenticate("current",{session:false}),
authorize(["admin"]),
async(req,res)=>{

const product = await ProductModel.create(req.body)

res.send(product)

}
)

export default router