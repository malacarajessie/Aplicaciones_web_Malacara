import { Schema, Document, Types, model  } from "mongoose";
import bcrypt from 'bcrypt'; //importacion para encriptar

const saltRounds = 10; //numero de rondas para el bcrypt valor aleartorio

export interface IUser extends Document{
    name:string;
    _id: Types.ObjectId;
    username:string;
    password:string;
    email:string;
    role:string;
    phone:string;
    status:boolean;
    createDate:Date;
    deleteDate:Date;
    comparePassword(candidatePassword: string): Promise<boolean>; //metodo para comparar passwords
}
const userSchema=new Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
      type:String,
        required:true, 
    },
    email:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    status: {
    type: Boolean,
    required: true,
    },

    createDate:{
        type:Date,
        default: Date.now()
    },
    deleteDate:{
        type:Date,
        default: Date.now()
    },
});

//para encriptar antes de guardar
userSchema.pre<IUser>('save', async function (next) {
    const user = this;

    //solo encripta si se modifico o es nueva password
    if(!user.isModified('password'))
        return next();

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(user.password, salt);
        user.password == hash;
        next ();
    } catch (error) {
        return next (error as Error);
    }
});

//comparar password
userSchema.methods.comparePassword =async function (candidatePassword: string): Promise <boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>('User', userSchema, "user");