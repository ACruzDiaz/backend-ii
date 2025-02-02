import { UserService, CartService } from '../repositories/index.js';

import { isValidPassword, generateToken } from '../helpers/utils.js';

export const login = async (req, res) => {
    try {
      const{email, password} = req.body
      const result = await UserService.getByEmail(email)
      if(!result.payload)
        throw new Error("Este usuario no se encuentra registrado");
        
      const user = result.payload
      if(!isValidPassword(user, String(password))){
        throw new Error('Datos incorrectos. Rectifique su usuario y contraseña.');
        
      }
      const jwt_token = generateToken({user: {first_name :user.first_name, email: user.email, role : user.role, userId: user._id, cartId: user.cartId}});    

      res.cookie('currentUser', jwt_token, { httpOnly: true});
      res.json({status: 'ok', payload: 'Inicio de sesión exitoso'});
    } catch (error) {
      res.status(500).json({status: 'error', payload: error.message});
    }
  }
  
export const register = async (req,res) => {
  const userInfo = req.body
  try {
    
    const userExist = await UserService.getByEmail(userInfo.email)

    if(userExist.payload){
      throw new Error("El usuario ya esta registrado en la base de datos");
    }

    const cartId = await CartService.create()
    const newUser = {...userInfo, cartId:cartId};
    const result = await UserService.register(newUser)

    res.json({status:'ok', payload: result})
    // res.json({status:'ok', payload: `El usuario ${result} ha sido registrado en la base de datos.`});
  } catch (err) {
        res.status(500).json({status: 'error', payload: err.message})

  }
}


