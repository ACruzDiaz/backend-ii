import { Router } from 'express';
import {login, register} from '../controller/User.handler.js'

import { passportCall, authorization } from '../helpers/utils.js';

const router = Router();

router.post('/register', register)


router.post('/login', login)

//Implementar la autorizacion de user y admin
router.get('/current', passportCall('jwt'), authorization('USER'), (req,res)=>{
    if(!req.user) return res.status(500).send('Intenta logearte primero')
    res.json({status: 'ok', payload: req.user})
})

export default router;