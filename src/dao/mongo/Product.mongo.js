import productModel from "../../model/Product.model.js"

export default class ProductDAO{
  constructor(dao){
    this.dao = dao
  }

  getAll = async () => {
    try {
      const products = await productModel.find()
      return products

    } catch (error) {
      throw new Error(error.message);
      
    }
  }

  
  getById = async (pid) => {
    try {
      const product = await productModel.findById(pid).lean()
      return product

    } catch (error) {
      throw new Error(error.message);
      //throw new Error('Error al buscar el producto, revise el id.');
      
    }
  }

  createOne = async (newProduct) => {
    try {
      const dataProd = {...newProduct};
      console.log();
      const res = new productModel(dataProd)
      const isSaved = await res.save()
      if(isSaved){
        return isSaved
      } else{
        throw new Error("Error al registrar el producto");
      } 
    } catch (error) {
      throw new Error(error.message);
      
    }
  }

  deleteByID = async (pid) => {
    try {
      
      const deleteModel = await productModel.findOneAndDelete(
        {
          _id : pid
      },
    )
    if(!deleteModel)
      throw new Error("Este producto no existe en la base de datos");
      
    return pid
    } catch (error) {
      throw new Error(error.message);
      
    }
  }



  subtractById = async (pid, qty) => {
    //Esta funcion hace la resta al producto seleccionado por la 
    //cantidad seleccionada. Retorna true si se modificó. False si no
    try {
      const product = await this.getById(pid)
      if(!product)
        throw new Error("Este producto no existe en la base de datos");
      
      const subResult = product.stock - qty;
      if(subResult < 0){
        //No hay suficiente en stock = false
        return false
      }else{
        delete product._id
        const newProduct = {...product, stock: subResult} 
        const productModified = await productModel.updateOne({_id: pid},{ $set: newProduct })
        return true
         
      }
    } catch (error) {
      throw new Error(error.message)
      
    }
  }
  
  purchase = async(itemList) => {
    try {
      const status = {
        purchased:[],
        noPurchased:[]
      }
      for (const item of itemList) {
        let res = await this.subtractById(item._id._id, item.quantity,)
        let subtotal = item._id.price * item.quantity
        res ? 
          status.purchased.push({quantity:item.quantity, _id:item._id._id, amount: subtotal})
          : 
          status.noPurchased.push({quantity:item.quantity, _id:item._id._id, amount: subtotal})
      }
      return status
        
    } catch (error) {
      throw new Error(error.message)
      
    }
  }


}