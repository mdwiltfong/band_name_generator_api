const { User } = require("../modelDefinitions");

class UserWrapper {
  static #model = User;
  static async addUser(userObj) {
    try {
      if (this.#checkUserObject(userObj)) {
        const user = await User.create(userObj);
        return user;
      }
    } catch (error) {
      throw Error(error.message);
    }
  }

  static async updateUser(userObj) {
    try {
      if (this.#checkUserObject(userObj)) {
        const updatedUser = await User.update(userObj, {
          where: {
            id: userObj.id,
          },
          returning: ["id", "username", "password", "email"],
        });
        return updatedUser;
      }
    } catch (error) {
      console.log(error);
      throw Error("There was an issue updating the user");
    }
  }
  static async #getUser(userId) {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    return user;
  }
  static async getUser(userId = null, username = null) {
    try {
      if (userId == null && username == null) {
        throw Error("Either a user id or user name must be provided.");
      }
      if (username == null) {
        return this.#getUser(userId);
      }
      const user = await User.findOne({
        where: {
          username: username,
        },
      });
      return user;
    } catch (error) {
      console.error(error);
      throw Error("There was an issue retrieving this user.");
    }
  }
  static async getAllUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw Error("Unable to retrieve all users in DB");
    }
  }

  static #checkUserObject(userObj) {
    if (!userObj.id) {
      throw new Error("User object is missing id property");
    }
    if (!userObj) {
      throw new Error("User object is missing");
    }

    if (!userObj.email) {
      throw new Error("Email property is missing from user object");
    }

    if (!userObj.firstName) {
      throw new Error("First name property is missing from user object");
    }

    if (!userObj.lastName) {
      throw new Error("Last name property is missing from user object");
    }

    return true;
  }
}

module.exports = { UserWrapper };
