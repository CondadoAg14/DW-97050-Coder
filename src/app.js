import express from "express"
import dotenv from "dotenv"
import passport from "passport"

import connectMongo from "./config/mongo.js"
import initializePassport from "./config/passport.config.js"

import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import sessionsRouter from "./routes/sessions.router.js"

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

connectMongo()

initializePassport()

app.use(passport.initialize())

app.use("/api/products",productsRouter)
app.use("/api/carts",cartsRouter)
app.use("/api/sessions",sessionsRouter)

app.listen(process.env.PORT || 8080,()=>{
console.log("Servidor corriendo")
})