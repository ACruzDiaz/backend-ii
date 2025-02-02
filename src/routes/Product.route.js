import {getAllProducts, getProductById, createProduct, deleteProductByID} from '../controller/Product.handler.js'
import { passportCall, authorization } from '../helpers/utils.js';
import { Router } from 'express';
const router = Router();

//Consultar todos los productos
router.get('/', passportCall('jwt'), authorization('ADMIN'), getAllProducts)

//Conssultar un solo producto
router.get('/:pid', passportCall('jwt'), authorization('ADMIN'),  getProductById)
 
//Agregar un nuevo producto
router.post('/', passportCall('jwt'), authorization('ADMIN'),  createProduct)

//Borrar un producto por id
router.delete('/:pid', passportCall('jwt'), authorization('ADMIN'), deleteProductByID)

export default router