import { Router } from 'express';
import {getCartById, addItemToCart, purchaseCart} from '../controller/Cart.handler.js'
import { passportCall, authorization } from '../helpers/utils.js';

const router = Router();


//Consultar los productos dentro de un carro
router.get('/:cid',passportCall('jwt'), authorization('USER'), getCartById )

//Agregar un nuevo producto al carro
router.post('/:pid/',passportCall('jwt'),authorization('USER'), addItemToCart)

//Terminar la compra
router.get('/:cid/purchase',passportCall('jwt'),authorization('USER'), purchaseCart)

export default router


