import TicketModel from "../dao/mongo/models/ticket.model.js";

export default class TicketRepository {

  async create(ticketData) {
    const ticket = await TicketModel.create(ticketData);
    return ticket;
  }

}