import passport from "passport"
import {Strategy as LocalStrategy} from "passport-local"
import {Strategy as JwtStrategy,ExtractJwt} from "passport-jwt"

import UserRepository from "../repositories/user.repository.js"
import {createHash,isValidPassword} from "../utils/bcrypt.js"

const userRepository = new UserRepository()

const initializePassport = ()=>{

// REGISTER

passport.use("register",
new LocalStrategy(
{
passReqToCallback:true,
usernameField:"email"
},
async(req,email,password,done)=>{

try{

const {first_name,last_name} = req.body

if(!first_name || !last_name){
return done(null,false,{message:"Datos incompletos"})
}

const exists = await userRepository.getByEmail(email)

if(exists){
return done(null,false,{message:"Usuario ya existe"})
}

const user = await userRepository.create({

first_name,
last_name,
email,
password:createHash(password),
role:"user"

})

return done(null,user)

}catch(error){

return done(error)

}

}
))

// LOGIN

passport.use("login",
new LocalStrategy(
{
usernameField:"email"
},
async(email,password,done)=>{

try{

const user = await userRepository.getByEmail(email)

if(!user){
return done(null,false,{message:"Usuario no encontrado"})
}

if(!isValidPassword(user,password)){
return done(null,false,{message:"Password incorrecto"})
}

return done(null,user)

}catch(error){

return done(error)

}

}
))

// CURRENT

passport.use("current",
new JwtStrategy(
{
jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
secretOrKey:process.env.JWT_SECRET
},
async(jwt_payload,done)=>{

return done(null,jwt_payload.user)

}
))

}

export default initializePassport