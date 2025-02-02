import {CartService, ProductService, TicketService} from '../repositories/index.js'

export const getCartById = async(req,res) => {
  try {
    const cid = req.params.cid
    // const cid = req.user.cartId
    const result = await CartService.getById(cid)
    if(!result)
      throw new Error("El carrito no esta registrado en la base de datos");
      
    res.status(200).json({status:'ok', payload:result})
  } catch (error) {
    res.status(500).json({status:'error', message: error.message})
    
  }
}

export const addItemToCart = async(req,res) => {
  try {
    const cid = req.user.cartId
    const pid = req.params.pid
    //Asegurarnos de que el producto exista
    const productExist = await ProductService.getById(pid)
    if(!productExist)
      throw new Error("El ID del producto que se intenta agregar es incorrecto");
      
    const done = await CartService.addOne(cid, pid)
    if(!done)
      throw new Error("Error al intentar añadir el producto al carrito.");
      
    res.status(200).json({status:'ok', payload:'Producto añadido al carrito'})

  } catch (error) {
    res.status(500).json({status:'error', message: error.message})
    
  }
}

export const purchaseCart = async (req,res) =>{
  try {
    const cid = req.params.cid
    const userEmail = req.user.email
    //Buscar que el carro exista en la base de datos
    const cart = await CartService.getById(cid, true)
    if(!cart)
      throw new Error("El carro que buscas no existe en la base de datos");
    if(!cart.products.length)
      throw new Error("No se puede completar la compra. El carro esta vácio");
      
    //Corroboramos que hay suficientes productos en stock
    //y restamos los items y retornamos la info para el ticket
    // console.log(cart.products);
    const purchasedItems = await ProductService.purchase(cart.products)

    //Modificar el carrito
    const modifiedCart = await CartService.dump(cid, purchasedItems.noPurchased)
    
    //Con el resultado, calculamos el total
    let totalAmount = purchasedItems.purchased.reduce((acc, cur)=>{
      return acc.amount + cur.amount
    })

    if( typeof totalAmount!== 'number' )
      totalAmount = totalAmount.amount
    
    //Hacemos el ticket
    const ticket = await TicketService.createTicket(totalAmount, userEmail )
    res.status(200).json({status:'ok', payload: ticket})


  } catch (error) {
    res.status(500).json({status:'error', message: error.message})
    
  }
}

export const deleteCartsItem = async(req,res) => {

}

export const dumpCart = async(req,res) =>{

}