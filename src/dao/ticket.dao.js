import TicketModel from "../../models/ticket.model.js"

export default class TicketDAO {

  async create(ticket) {
    return await TicketModel.create(ticket)
  }

  async readAll(filter = {}) {
    return await TicketModel.find(filter).lean()
  }

  async readOne(filter) {
    return await TicketModel.findOne(filter).lean()
  }

  async update(id, data) {
    return await TicketModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    )
  }

  async delete(id) {
    return await TicketModel.findByIdAndDelete(id)
  }

}
