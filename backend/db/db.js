//  importamos la libreria para db
import mongoose from "mongoose";

// Hacemos la funcion para hacer la conexion de node con mongo
const dbConnection = () => {
  try {
    mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection with MongoDB: OK");
  } catch (e) {
    console.log("Error connecting to MongoDB: \n ", e);
  }
};

export default { dbConnection };
