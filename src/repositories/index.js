import TicketDAO from "../dao/mongo/Ticket.mongo.js";
import UserAuthDAO from "../dao/mongo/User.mongo.js";
import CartDAO from "../dao/mongo/Cart.mongo.js"
import ProductDAO from "../dao/mongo/Product.mongo.js"

import TicketRepo from "./Ticket.repo.js";
import UserRepo from "./User.repo.js";
import CartRepo from "./Cart.repo.js";
import ProductRepo from "./Product.repo.js"

export const TicketService = new TicketRepo(new TicketDAO())
export const UserService = new  UserRepo(new UserAuthDAO())
export const CartService = new CartRepo(new CartDAO())
export const ProductService = new ProductRepo(new ProductDAO())
