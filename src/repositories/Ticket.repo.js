import TicketDTO from "../dao/dto/Ticket.dto.js";

export default class TicketRepo {

  constructor(dao){
    this.dao = dao
  }

  getTickets = async() => {
    let res = await this.dao.get()
    return res
  }

  createTicket = async(amount, purchaser) => {
    let ticketToInsert = new TicketDTO({amount, purchaser})
    let res = await this.dao.create(ticketToInsert)
    return res
  }
}