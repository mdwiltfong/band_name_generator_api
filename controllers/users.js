const { UserWrapper } = require("../models/modelFunctions/user.js");
const getUsers = async (req, res) => {
  try {
    const users = await UserWrapper.getAllUsers();
    res.json({ users });
  } catch (error) {
    res.status(500).send("something went wrong getting bands from DB");
  }
};

const getUser = async (req, res) => {
  try {
    const request = req.body;
    const user = await UserWrapper.getUser(request.user.id);
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).send("something went wrong getting the user from the DB");
  }
};

const updateUser = async (req, res) => {
  try {
    const request = req.body;
    const updateUser = await UserWrapper.updateUser(request.user);
    res.json({ updateUser });
  } catch (error) {
    console.error(error);
    res.status(500).send("unable to update user");
  }
};

module.exports = { updateUser, getUser, getUsers };
