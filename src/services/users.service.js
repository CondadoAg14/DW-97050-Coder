import UserRepository from "../repositories/user.repository.js"

const userRepository = new UserRepository()

export default class UserService {

 async getUserByEmail(email){
  return await userRepository.getUserByEmail(email)
 }

 async getUserById(id){
  return await userRepository.getUserById(id)
 }

 async createUser(user){
  return await userRepository.createUser(user)
 }

}