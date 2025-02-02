import CartDTO from '../dao/dto/Cart.dto.js'

export default class CartRepo {

  constructor(dao){
    this.dao = dao
  }

  create = async() => {
    try {
      let result = await this.dao.create()
      return result
    } catch (error) {
      throw new Error(error.message);
      
    }
  }

  getById = async(cid,populate)=> {
    try {
      let res = await this.dao.getById(cid, populate)
      return res

    } catch (error) {
      throw new Error(error.message);
      
    }
  }

  addOne = async(cid,pid) =>{
    try {
      let res = await this.dao.addOne(cid,pid)
      return res

    } catch (error) {
      throw new Error(error.message)
    }
  }

  purchase = async(cid) => {
    try {
      let res = await this.dao.purchase(cid)
      return res
    } catch (error) {
      throw new Error(error.message);
      
    }
  }
  
  removeOne = async(pid, cid)=>{
    try {
      let res = await this.dao.removeOne(pid, cid)
      return res

    } catch (error) {
      throw new Error(error.message)
    }
  }

  dump = async(cid, afterPurchase) =>{
    try {
      let res = await this.dao.dump(cid, afterPurchase)
      return res

    } catch (error) {
      throw new Error(error.message)
    }
  }
}