const bcrypt = require('bcrypt');

class PasswordUtils {
  constructor() {
    this.saltRounds = 10;
  }

  encrypt = password => {
    const salt = bcrypt.genSaltSync(this.saltRounds);
  
    return bcrypt.hashSync(password, salt);
  };

  verify = (password, passwordFromDb) => bcrypt.compareSync(password, passwordFromDb);
}

module.exports = new PasswordUtils();
