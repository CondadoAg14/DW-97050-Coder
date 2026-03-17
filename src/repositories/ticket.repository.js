import TicketDAO from "../dao/mongo/ticket.dao.js"
 
const ticketDAO = new TicketDAO()
 
export default class TicketRepository {
 
  async create(ticketData) {
    return await ticketDAO.create(ticketData)
  }
 
  async getTicketById(id) {
    return await ticketDAO.readOne({ _id: id })
  }
 
  async getTickets() {
    return await ticketDAO.readAll()
  }
 
}