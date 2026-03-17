import SessionService from "../services/sessions.service.js"

const sessionService = new SessionService()

export const register = async (req,res)=>{
 try{
  const result = await sessionService.register(req.body)
  res.send(result)
 }catch(error){
  res.status(500).send({error:error.message})
 }
}

export const login = async (req,res)=>{
 try{
  const result = await sessionService.login(req.body)
  res.send(result)
 }catch(error){
  res.status(500).send({error:error.message})
 }
}

export const current = async (req,res)=>{
 try{
  const result = await sessionService.getCurrentUser(req.user)
  res.send(result)
 }catch(error){
  res.status(500).send({error:error.message})
 }
}

export const forgotPassword = async (req,res)=>{
 try{
  const result = await sessionService.forgotPassword(req.body.email)
  res.send(result)
 }catch(error){
  res.status(500).send({error:error.message})
 }
}

export const resetPassword = async (req,res)=>{
 try{
  const result = await sessionService.resetPassword(
   req.params.token,
   req.body.password
  )
  res.send(result)
 }catch(error){
  res.status(500).send({error:error.message})
 }
}