import PasswordReset from "../../models/passwordReset.model.js";

export default class PasswordResetDAO {

  async create(data) {
    return await PasswordReset.create(data);
  }

  async findOne(filter) {
    return await PasswordReset.findOne(filter);
  }

  async delete(id) {
    return await PasswordReset.deleteOne({ _id: id });
  }

}