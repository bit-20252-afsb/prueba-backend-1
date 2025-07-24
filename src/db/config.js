import mongoose from "mongoose";
const mongoUri = process.env.MONGO_URI;
const databaseConnection = async () =>{
    try {
       await mongoose.connect(mongoUri);
       console.log("DB conectada exitosamente!");
    } catch (error) {
        console.error(error);
    }
}
export default databaseConnection;