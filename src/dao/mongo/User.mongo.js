import userModel from "../../model/User.model.js";
export default class UserAuthDAO {

  getByEmail = async (email) => {
    try{
      const data = await userModel.findOne({email:email}).lean()
      
      return {status: 'ok', payload: data }
    }catch(error){
      throw new Error(error.message);

    }
  }
  create = async (newUser) => {
    try{
        const result = new userModel(newUser)
        const isSaved = await result.save()
        if(isSaved){
          return isSaved  
        } else{
          throw new Error("Error al crear un nuevo usuario");
        }
    
    }catch(error){
      throw new Error(error.message);
    }
  }
}