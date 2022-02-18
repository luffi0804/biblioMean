import role from "../models/role.js";

const registerRole = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "Incomplete data" });

  let roleSchema = new role({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });

  let result = await roleSchema.save();
  // if (!result)
  return !result
    ? res.status(500).send({ message: "failed to register role" })
    : res.status(200).send({ result });

  // res.status(200).send({ result });
};

const listRole = async (req, res) => {
  let roles = await role.find();

  return roles.length === 0
    ? res.status(400).send({ message: "No search result" })
    : res.status(200).send({ roles });
};

export default { registerRole, listRole };
