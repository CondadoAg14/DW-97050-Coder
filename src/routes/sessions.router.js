import {Router} from "express"
import passport from "passport"

import {generateToken} from "../utils/jwt.js"
import UserDTO from "../dto/user.dto.js"

import {sendMail} from "../utils/mailer.js"

import crypto from "crypto"

import PasswordReset from "../models/passwordReset.model.js"
import UserModel from "../models/user.model.js"

import {createHash} from "../utils/bcrypt.js"

const router = Router()

// REGISTER

router.post(
"/register",
passport.authenticate("register",{session:false}),
(req,res)=>{
res.send({status:"success"})
}
)

// LOGIN

router.post(
"/login",
passport.authenticate("login",{session:false}),
(req,res)=>{

const token = generateToken(req.user)

res.send({token})

}
)

// CURRENT

router.get(
"/current",
passport.authenticate("current",{session:false}),
(req,res)=>{

const user = new UserDTO(req.user)

res.send(user)

}
)

// FORGOT PASSWORD

router.post("/forgot-password",async(req,res)=>{

const {email} = req.body

const user = await UserModel.findOne({email})

if(!user){
return res.send({message:"Usuario no encontrado"})
}

const token = crypto.randomBytes(20).toString("hex")

await PasswordReset.create({

email,
token,
expires:Date.now()+3600000

})

const link = `http://localhost:8080/reset-password/${token}`

await sendMail(email,"Recuperar contraseña",
`<a href="${link}">Restablecer contraseña</a>`)

res.send({message:"Correo enviado"})

})

// RESET PASSWORD

router.post("/reset-password/:token",async(req,res)=>{

const reset = await PasswordReset.findOne({

token:req.params.token

})

if(!reset){
return res.send({error:"Token inválido"})
}

if(reset.expires < Date.now()){
return res.send({error:"Token expirado"})
}

const {password} = req.body

const user = await UserModel.findOne({email:reset.email})

user.password = createHash(password)

await user.save()

await PasswordReset.deleteOne({_id:reset._id})

res.send({message:"Contraseña actualizada"})

})

export default router