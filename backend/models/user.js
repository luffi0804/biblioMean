// importamos la libreria
import mongoose from "mongoose";

// creamos el schema de la base de datos
const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  dateOfBirth: Date,
  phone: String,
  email: String,
  domicile: String,
  role: {type: mongoose.Schema.ObjectId, ref: "roles"},
  registerDate: {type: date, default: Date.now},
  dbStatus: true,

});

const user = mongoose.model("users", userSchema);
export default user;
