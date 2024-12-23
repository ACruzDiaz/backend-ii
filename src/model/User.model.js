import mongoose from "mongoose";
import { createHash } from "../helpers/utils.js";

const { Schema } = mongoose;

//Definimos el esquema usuario
const userSchema = new Schema({
    first_name: { type: String, required: true }, 
    last_name: { type: String, required: true }, 
    email: { type: String, required: true, unique: true },
    age: {type: Number, require:true},
    password: { type: String, required: true }, 
    cartId: {type: mongoose.Schema.Types.ObjectId, ref: 'cart'}, // Referencia a CART
    role: { type: String, default: 'user' }, // Rol del usuario (por defecto, 'user')
});

//Middleware para hashear la contraseña antes de guardar el usuario
userSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next(); 
    this.password = createHash(this.password);
    next();
})

const userModel = mongoose.model('User', userSchema);

export default userModel;