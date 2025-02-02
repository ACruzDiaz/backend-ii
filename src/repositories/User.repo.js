import UserDTO from "../dao/dto/User.dto.js";

export default class UserRepo {

  constructor(dao){
    this.dao = dao
  }

  getByEmail = async(email) => {
    try {
      let res = await this.dao.getByEmail(email)
      return res
      
    } catch (error) {
      throw new Error(error.message);
      
    }
  }

  register = async(user) => {
    try {
      let userToRegister = new UserDTO(user)
      let res = await this.dao.create(userToRegister)
      return res
      
    } catch (error) {
      throw new Error(error.message);
      
    }
  }
}