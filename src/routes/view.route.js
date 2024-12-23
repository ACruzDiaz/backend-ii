import { Router } from 'express';
import { passportCall } from '../helpers/utils.js';
import { __dirname } from '../path.js';


const router = Router();

router.get('/', (req,res)=>{
  if (req.cookies.currentUser) { // Si hay un usuario en la sesión 
    res.redirect('/current')
  } else {
    res.sendFile(__dirname + '/public' + '/nose.html');
  }
})

router.get('/login', (req,res)=>{
    res.sendFile(__dirname + '/public' + '/login.html');
  
})

router.get('/signup', (req,res)=>{
  res.sendFile(__dirname + '/public' + '/signup.html');

})
router.get('/current',  passportCall('jwt'), (req,res)=>{
  res.send(`<h1>Hola ${req.user.first_name}</h1>
            <p>has ingresado con el correo ${req.user.email}</p>
              <form action="http://localhost:3033/logout" method="get">
              <button type="submit">Cerrar sesión</button>
              </form>
    `)
})

router.get('/logout', passportCall('jwt'), (req,res)=>{
  res.clearCookie('currentUser');
  res.redirect('/')
})


export default router;