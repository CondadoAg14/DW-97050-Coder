import UserModel from "../models/user.model.js"

export default class UserDAO{

getByEmail = async(email)=>{
return UserModel.findOne({email})
}

create = async(user)=>{
return UserModel.create(user)
}

}