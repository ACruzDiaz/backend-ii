//En esta capa transformaremos los datos recibidos del usuario
//Tambien aplicaremos validaciones
export default class TicketDTO{

  constructor(ticket){
    this.amount = this.validate_amount(ticket.amount)
    this.purchaser = this.validate_purchaser(ticket.purchaser)
  }


  validate_amount(total){

    return total
  }

  validate_purchaser(purchaser){

    return purchaser
  }


  
}