import { Router } from 'express';
import hUser from '../handler/user.hand.js'
import { passportCall, authorization } from '../helpers/utils.js';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const result = await hUser.add(req.body);
    if(result.status === 'error') return res.status(401).json(result);
    res.json(result)
  } catch (err) {
    res.status(500).json({status: 'error', payload: err.message})
    
  }
})

router.post('/login', async (req, res) => {
  try{
    const { email, password } = req.body;
    let result = await hUser.login(email, password);
    if(result.status === 'error') return res.status(500).json(result);

    res.cookie('currentUser', result, { httpOnly: true});
    res.json({status: 'ok', payload: 'Inicio de sesión exitoso'});
  }catch(error){
    res.status(500).json({status: 'error', payload: error.message}); //Manejamos errores durante el proceso de login
  }
})

//Implementar la autorizacion de user y admin
router.get('/current', passportCall('jwt'), authorization('USER'), (req,res)=>{
    if(!req.user) return res.status(500).send('Intenta logearte primero')
    res.json({status: 'ok', payload: req.user})
})

export default router;