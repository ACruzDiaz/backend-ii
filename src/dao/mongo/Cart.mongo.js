import cartModel from "../../model/Cart.model.js";

export default class CartDAO{
  create = async() =>{
    try {
      let result = new cartModel({products: []})
      const status = await result.save()
      if(!status)
        throw new Error("Error al intentar crear carrito para el usuario");
      
      return status._id
    } catch (error) {
      throw new Error(error.message)
    }
  }

  getById = async(cid,populate = null)=> {
    try {
      if(populate){
        const cart = await cartModel.findOne({_id:cid}).populate('products._id').lean();
        return cart
      }
      const cart = await cartModel.findOne({_id:cid}).lean();
      return cart

    } catch (error) {
      throw new Error(error.message);
      
    }
  }

  addOne = async(cid,pid) =>{
    try {
        const quantity = 1
        // const cartToUpdate = await cartModel.findById(cid)
        const cartToUpdate = await this.getById(cid)
        if(cartToUpdate === null){
          throw new Error('El carrito no existe en la base de datos')
        }
  
        const findIDinProd = await cartModel.findOne(
          {
            'products._id': pid,
            _id: cid
          }
        )
        if (findIDinProd){
          const productExist = await cartModel.findOneAndUpdate(
            { 
              _id : cid,
              'products._id': pid 
  
            },
            {
              $inc: {
                'products.$[elem].quantity': quantity
              },
            },
            {
              arrayFilters: [{ 'elem._id': pid }],
              new : true,
            }
          );        
        }else{
          await cartModel.findOneAndUpdate(
            { _id: cid },
            {
              $push: {
                products: {
                  quantity: quantity,
                  _id: pid,
                }
              }
            },
            {
              new: true,
              upsert: true
            }
          );
        }
        return true
    } catch (error) {
      throw new Error(error.message)
    }
  }


  
  removeOne = async(pid, cid)=>{
    try {
        const productExist = await cartModel.findOne(
          { 
            _id : cid,
            'productos.code': pid 
  
          },
          {
  
          },
          {
            arrayFilters: [{ 'elem.code': pid }],
            new : true,
          }
        );        
  
        if(!productExist){
          throw new Error(`Error al eliminar el producto ${pid}. Revise que el producto se encuentre en su carrito.`); 
  
        }
        const fone = await cartModel.findOneAndUpdate(
          { 
            _id : cid,
  
          },
          {
            $pull: {
              'productos': {
                code:{
                  $eq: pid,
                }
              }
            },
          },
          {
            new : true,
          })
        if(!fone){
  
          throw new Error(`Error al eliminar el producto ${pid}. Revise que el carrito exista.`); 
        }
        return true
    } catch (error) {
      throw new Error(error.message)
    }
  }

  dump = async(cid, afterPurchase) =>{
    try {
      const findCart = await cartModel.findById(cid) 
      if(!findCart) throw new Error("El carrito no existe en la base de datos");
      
      const updatedCart = new cartModel(findCart)
      updatedCart.products = [];
      const isSaved = await updatedCart.save()
      if(!isSaved) throw new Error("Error al actualizar el carrito. Intente de nuevo.");
      return true
    } catch (error) {
      throw new Error(error.message)
    }
  }

}