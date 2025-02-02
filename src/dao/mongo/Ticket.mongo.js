import ticketModel from '../../model/Ticket.model.js'

export default class TicketDAO {

    get = async () => {
        try{
            let tickets = await ticketModel.find().lean();
            if(!tickets)
                throw new Error("No hay tickets en la base de datos.");
                
            return tickets;
        }catch(error){
            throw new Error(error.message);

        }
    }
    create = async (ticket) => {
        try{
            let result = await ticketModel.create(ticket);
            return result;

        }catch(error){
            throw new Error(error.message);
            
        }
    }
    
}