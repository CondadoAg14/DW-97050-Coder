import UserDAO from "../dao/mongo/user.dao.js"

const userDAO = new UserDAO()

export default class UserRepository {

 async getUsers(){
  return await userDAO.readAll()
 }

 async getUserById(id){
  return await userDAO.readOne({_id:id})
 }

 async getUserByEmail(email){
  return await userDAO.readOne({email})
 }

 async createUser(user){
  return await userDAO.create(user)
 }

 async updateUser(id,data){
  return await userDAO.update(id,data)
 }

 async deleteUser(id){
  return await userDAO.delete(id)
 }

}