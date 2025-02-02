import ProductDTO from '../dao/dto/Product.dto.js'


export default class ProductRepo {

  constructor(dao){
    this.dao = dao
  }

  getAll = async()=>{
    try {
      const result = await this.dao.getAll()
      return result
    } catch (error) {
      throw new Error(error.message);
      
    }
  }
  getById = async(cid)=> {
    try {
      let res = await this.dao.getById(cid)
      return res

    } catch (error) {
      throw new Error(error.message);
      
    }
  }

  
  createOne = async(newProduct)=>{
    try {
      let productTransformed = new ProductDTO(newProduct)
      let res = await this.dao.createOne(productTransformed)
      return res

    } catch (error) {
      throw new Error(error.message)
    }
  }

  purchase = async(itemList) =>{
    try {
      let res = await this.dao.purchase(itemList)
      return res

    } catch (error) {
      throw new Error(error.message)
    }
  }

  deleteByID = async(pid) =>{
    try {
      let res = await this.dao.deleteByID(pid)
      return res

    } catch (error) {
      throw new Error(error.message)
    }
  }
}