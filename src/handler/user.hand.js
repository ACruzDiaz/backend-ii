import userModel from '../model/User.model.js'
import { isValidPassword, generateToken } from '../helpers/utils.js';
export default class hUser {
  static async get (email){
    try {
      const data = await userModel.findOne({email:email}).lean()
      if(!data) return {status: 'error', payload: `El correo ${email} no existe en la base de datos`}
      
      return {status: 'ok', payload: data }
      

    } catch (error) {
      throw new Error(`Error al buscar correo electronico`);
    }
  }
  static async login (email, password){
    try {
      //Validation email, password... 
      const result =  await hUser.get(email)
      const user = result.payload
      if(user.status === 'error') return user
      
      if(!isValidPassword(user, String(password))){
        return {status:'error', payload:'La contraseña es invalida'}
      }
      const jwt_token = generateToken({user: {'first_name' :user.first_name, email: user.email, role : user.role}});    
      return jwt_token
       //Almacenamos el token en una cookie HTTP-Only
    } catch (error) {
      throw new Error(`Error al hacer login`);
    }
  }
  
  static async add(props){
    const expectedKeys = ['first_name', 'last_name', 'email', 'password', 'age']
    try {
      const objectKeys = Object.keys(props)
      
      if (JSON.stringify(expectedKeys.sort()) !== JSON.stringify(objectKeys.sort())) return {status: 'error', payload: 'Cantidad o nombre de atributos incorrectos.'}

      for (const key in props) {
        if (!props[key] || props[key] === "") {
          return {status: 'error', payload: `Datos invalidos en el campo ${key}.`}
          
        }
      }
      let{first_name, last_name, email, password, age, role} = props
      role = 'USER'
      //Validar que el usuario no exista en la BD
      const findUser = await userModel.findOne({email: email})
      if(findUser){
        return {status: 'error', payload: `El usuario ya esta registrado en la base de datos`}
        
      }
      const newUser = {...props};
      const result = new userModel(newUser)
      const isSaved = await result.save()

      if(isSaved){
        return({status:'ok', payload: `El usuario ${isSaved.email} ha sido registrado en la base de datos.`});
      }

    } catch (err) {
      throw new Error("Error al crear un nuevo usuario");
    }
  }
}

