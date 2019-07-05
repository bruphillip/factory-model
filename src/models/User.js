import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init({
      // your fields here
    }, {
        sequelize
    });
    this.addHooks();
    return this;
  }

  addHooks() {
    this.addHook();
  }

  static associate(models) {
    // your associations here
  }

}

export default User ;