import mongoose from "mongoose";
import { generateCode } from "../helpers/utils.js";

const { Schema } = mongoose;


const ticketSchema = new Schema({
    code: {type:String, unique: true },
    purchase_datetime: {type: Date, default: Date.now},
    amount: {type:Number, required:true},
    purchaser: {type: String, required: true}
})


ticketSchema.pre('save', async function(next) {
    if (this.isNew) {
        this.code = generateCode(Math.random().toString());
    }
    next();
});
const ticketModel = mongoose.model('Ticket',ticketSchema);
export default ticketModel
