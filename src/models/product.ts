import { Schema, Types, model } from "mongoose";
 //nombre, precio,status,descripcion,cantidad
export interface IProducts extends Document{
    name:String;
    _idProduct: Types.ObjectId;
    price:Number;
    status:String;
    description:String;
    quantity:Number;
}
const productsSchema=new Schema<IProducts>({
   name: {
    type: String,
    required: true
  },
    price:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },

});

export const Products = model<IProducts>('Products', productsSchema);