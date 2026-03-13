import {Router} from "express"
import {CartModel} from "../models/cart.model.js"
import {ProductModel} from "../models/product.model.js"
import TicketModel from "../models/ticket.model.js"

import {v4 as uuid} from "uuid"

const router = Router()

router.post("/:cid/purchase",async(req,res)=>{

const cart = await CartModel.findById(req.params.cid).populate("products.product")

if(!cart){
return res.status(404).send({error:"Carrito no encontrado"})
}

let amount = 0

for(const item of cart.products){

const product = item.product

if(product.stock >= item.quantity){

product.stock -= item.quantity

await product.save()

amount += product.price * item.quantity

}

}

const ticket = await TicketModel.create({

code:uuid(),

amount,

purchaser:req.user.email

})

res.send(ticket)

})

export default router