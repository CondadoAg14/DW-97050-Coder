import PasswordReset from "../../models/passwordReset.model.js";

export default class PasswordResetDAO {

  async create(data) {
    return await PasswordReset.create(data);
  }

  async readOne(filter) {
    return await PasswordReset.findOne(filter).lean();
  }

  async delete(id) {
    return await PasswordReset.deleteOne({ _id: id });
  }

}