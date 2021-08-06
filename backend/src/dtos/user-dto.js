module.exports = class UserDto {
  id;
  name;
  surname;
  login;

  constructor(model) {
    this.id = model.id;
    this.name = model.name;
    this.surname = model.surname;
    this.login = model.login;
  }
};
