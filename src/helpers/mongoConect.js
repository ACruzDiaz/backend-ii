import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config()

const mongo = {
  url : process.env.URI_MONGO,
  connect: async ()=>{
    try {
      await mongoose.connect(mongo.url)
      console.log('Base de datos en linea');
    } catch (error) {
      throw new Error("Error al conectar a mongo");
      
    }
  }

}

export default mongo