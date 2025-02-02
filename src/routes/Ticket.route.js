import { Router } from 'express';
const router = Router();
import { getTickets } from '../controller/Ticket.handler.js';
import { passportCall, authorization } from '../helpers/utils.js';


//Consultar el ticket creado
router.get('/', passportCall('jwt'), authorization('ADMIN'), getTickets)



export default router