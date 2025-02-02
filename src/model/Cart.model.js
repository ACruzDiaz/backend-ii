import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema({
    products: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {type: Number}
    }]

})

const cartModel = mongoose.model('Cart', cartSchema);

export default cartModel