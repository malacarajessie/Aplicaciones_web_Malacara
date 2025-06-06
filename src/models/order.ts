import { Schema, model, Document, Types } from "mongoose";

export interface IOrder extends Document {
    user: Types.ObjectId;      
    total: number;
    subtotal: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
    {
        user: { 
            type: Schema.Types.ObjectId,
             ref: "User",
              required: true
             },
        total:
         { type: Number, 
            required: true
         },
        subtotal: { 
            type: Number, 
            required: true 
        },
        status: {
            type: String,
            enum: ["pendiente", "procesando", "completada", "cancelada"],
            default: "pendiente"
        }
    },
    {
        timestamps: true 
    }
);

export const Order = model<IOrder>("Order", OrderSchema);
