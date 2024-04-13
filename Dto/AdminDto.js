export default class AdminDto {
  id;
  firstName;

  constructor(model) {
    this.id = model.id;
    this.firstName = model.firstName;
  }
}
