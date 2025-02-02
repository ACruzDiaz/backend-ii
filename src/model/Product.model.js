import mongoose from "mongoose";
import { generateCode } from "../helpers/utils.js";

const { Schema } = mongoose;

const productSchema = new Schema({
  code: {type:String, unique: true },
  name: {type: String, required: true},
  stock: {type: Number, required: true},
  price: {type: Number, required:true},
  description: {type:String, required:false}

})


productSchema.pre('save', async function(next) {
    if (this.isNew) {
        this.created_at = Date.now();
        this.code = generateCode(Math.random().toString());
    }
    next();
});

const productModel = mongoose.model('Product', productSchema);
export default productModel