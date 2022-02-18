import user from "../models/user.js";
// import role from "../models/role.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const passHash = await bcrypt.hash(req.body.password, 10);

  const userSchema = new user({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    phone: req.body.phone,
    domicile: req.body.domicile,
    role: req.body.role,
    dbStatus: true,
  });

  const result = await userSchema.save();
  if (!result) return res.status(500).send({ message: "Failed to register" });
  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: result._id,
          name: result.name,
          role: result.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Register error" });
  }
};

const listUser = async (req, res) =>{
  let users = await user.find({name: new RegExp(req.params["name"])}).populate("role").exec();

  return users-length === 0 ? res.status(400).send({message: "No search result"}): res.status(200).send({users})
}

export default { registerUser, listUser };
