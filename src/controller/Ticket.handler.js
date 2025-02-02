import { TicketService } from "../repositories/index.js"


export const getTickets = async(req,res) =>{
    try {
      const data = await TicketService.getTickets()
      if(!data) return {status: 'error', payload: `No hay tickets`}
       
      return res.status(200).json({status: 'ok', payload: data }) 
      

    } catch (error) {
      res.status(404).json({status: 'error', message: error.message})
    }
  }
  