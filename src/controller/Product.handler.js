import {ProductService} from '../repositories/index.js'

export const getAllProducts = async(req,res) => {
  try {
    const result = await ProductService.getAll()
    if(!result)
      throw new Error("No hay productos en la base de datos");
      
    return res.status(200).json(result)
  } catch (error) {
    res.status(404).json({status: 'error', message: error.message})
  }
}

export const getProductById = async(req,res) => {
  
  try {
    const pid = req.params.pid
    const result = await ProductService.getById(pid)
    if(!res)
      throw new Error(`El producto con id: ${pid} no existe en la base de datos.`);
    
    return res.status(200).json(result)
  } catch (error) {
    res.status(404).json({status: 'error', message: error.message})
    
  }
}

export const createProduct = async(req,res) => {
  
  try {
    const newProduct = req.body
    const result = await ProductService.createOne(newProduct)
    return res.status(200).json({status:'ok', payload:result})
  } catch (error) {
    res.status(500).json({status:'error', message: error.message})
  }
}

export const deleteProductByID = async(req,res) =>{
  try {
    const pid = req.params.pid
    const result = await ProductService.deleteByID(pid)
    res.status(200).json({message:`Articulo ${pid} borrado exitosamente`})
    
  } catch (error) {
    res.status(500).json({status:'error', message: error.message})

    
  }
}