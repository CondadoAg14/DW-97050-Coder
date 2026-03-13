import UserDAO from "../dao/user.dao.js"

export default class UserRepository{

constructor(){
this.dao = new UserDAO()
}

getByEmail = async(email)=>{
return this.dao.getByEmail(email)
}

create = async(user)=>{
return this.dao.create(user)
}

}