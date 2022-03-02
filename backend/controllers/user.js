import user from "../models/user.js";
import bcrypt from "../lib/bcrypt.js";
import jwt from "../lib/jwt.js";
import userService from "../services/user.js";


//---------------------------------------------------------------------------------

const registerUser = async (req, res) => {

  let pass = await bcrypt.hassGenerate(req.body.password);

  const schema = new user({
    name: req.body.name,
    email: req.body.email,
    password: pass,
    role: req.body.role,
    dbStatus: true,
  });

  const result = await schema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register user" });

  const token = await jwt.generateToken(result);

  return !token
    ? res.status(500).send({ message: "Failed to register user" })
    : res.status(200).send({ token });
};

const listUserAdmin = async (req, res) => {
  let users = await user
    .find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec();

  return users - length === 0
    ? res.status(400).send({ message: "No search result" })
    : res.status(200).send({ users });
};
const listUser = async (req, res) => {
  let users = await user
    .find({
      $and: [{ name: new RegExp(req.params["name"]) }, { dbStatus: "true" }],
    })
    .populate("role")
    .exec();

  return users.length === 0
    ? res.status(400).send({ message: "No search result" })
    : res.status(200).send({ users });
};


const deleteUser = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });

  const users = await user.findByIdAndUpdate(req.params["_id"], {
    dbStatus: false,
  });

  return !users
    ? res.status(400).send({ message: "Error deleting user" })
    : res.status(200).send({ message: "User deleted successful" });
};

const updateUserAdmin = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.role || !req.body.email)
    return res.status(400).send({ message: "Incomplete data" });

  let pass = "";

  if (!req.body.password) {
    const findUser = await user.findOne({ email: req.body.email });
    pass = findUser.password;
  } else {
    pass = await bcrypt.hash(req.body.password, 10);
  }

  const editUser = await user.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    password: pass,
  });

  return !editUser
    ? res.status(500).send({ message: "Error editing user" })
    : res.status(200).send({ message: "User Update" });
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: "Invalid Data" });

  const userLogin = await user.findOne({ email: req.body.email });
console.log(req.body);
console.log(userLogin);

  //Funcion validLogin en el archivo ..services/user.js
   const validLogin= await userService.validLogin(req.body, userLogin);
  if(!validLogin)
    return res.status(400).send({ message: "Wrong email or password" });

  const token = await jwt.generateToken(userLogin);
  return !token
    ? res.status(500).send({ message: "Login error" })
    : res.status(200).send({ token });
};

export default {
  registerUser,
  listUserAdmin,
  listUser,
  login,
  deleteUser,
  updateUserAdmin,
  login
};
