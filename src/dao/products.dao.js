import ProductModel from "../../models/product.model.js"

export default class ProductDAO {

 async create(product){
  return await ProductModel.create(product)
 }

 async readAll(filter = {}){
  return await ProductModel.find(filter).lean()
 }

 async readOne(filter){
  return await ProductModel.findOne(filter).lean()
 }

 async update(id,data){
  return await ProductModel.findByIdAndUpdate(
   id,
   { $set: data },
   { new: true }
  )
 }

 async delete(id){
  return await ProductModel.findByIdAndDelete(id)
 }

}