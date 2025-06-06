import mongoose from "mongoose";

const connectBDMongo= async():Promise<void>=>{
const mongoUri = "mongodb://localhost:27017/prueba";

    try{
        await mongoose.connect(mongoUri);
        console.log("Conexion con mongo")

    } catch (error) {
        console.log("error al conectarse con mongo: ", error );
    }
}

export default connectBDMongo;