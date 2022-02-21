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

const listRoleAdmin = async (req, res) => {
  let roles = await role.find();

  return roles.length === 0
    ? res.status(400).send({ message: "No search result" })
    : res.status(200).send({ roles });
};

const deleteRoleAdmin = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });

  const roles = await role.findByIdAndUpdate(req.params["_id"]);

  return !roles
    ? res.status(400).send({ message: "Error deleting role" })
    : res.status(200).send({ message: "Role deleted" });
};
const updateRoleAdmin = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.role)
    return res.status(400).send({ message: "Incomplete data" });

  const editRole = await role.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description,
  });

  return !editRole
    ? res.status(500).send({ message: "Error changin role" })
    : res.status(200).send({ message: "Role changed" });
};

export default { registerRole, listRoleAdmin, deleteRoleAdmin, updateRoleAdmin };
