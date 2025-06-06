import { Schema, model, Document } from "mongoose";

export interface IRole extends Document {
    tipo: string;
    name: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
const RoleSchema = new Schema<IRole>(
    {
        tipo: { 
            type: String, 
            required: true 
        },
        name: { 
            type: String, 
            required: true
         },
        status: {
            type: String,
            enum: ["activo", "inactivo"],
            default: "activo"
        }
    },
    {
        timestamps: true 
    }
);

export const Role = model<IRole>("Role", RoleSchema);
