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
        });
        return updatedUser;
      }
    } catch (error) {
      console.log(error);
      throw Error("There was an issue updating the user");
    }
  }
  static async getUser(userId) {
    try {
      if (userId != null) {
        const user = await User.findOne({
          where: {
            id: userId,
          },
        });
        return user;
      } else {
        throw Error("No user id was provided");
      }
    } catch (error) {}
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
