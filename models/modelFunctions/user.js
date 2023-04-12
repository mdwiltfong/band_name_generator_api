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
    if (this.#checkUserObject(userObj)) {
      const updatedUser = await User.update();
    }
  }

  static #checkUserObject(user) {
    if (!user) {
      throw new Error("User object is missing");
    }

    if (!user.email) {
      throw new Error("Email property is missing from user object");
    }

    if (!user.firstName) {
      throw new Error("First name property is missing from user object");
    }

    if (!user.lastName) {
      throw new Error("Last name property is missing from user object");
    }

    return true;
  }
}
