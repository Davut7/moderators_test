export default class ModeratorDto {
  id;
  firstName;
  verifyLevel;

  constructor(model) {
    this.id = model.id;
    this.firstName = model.firstName;
    this.verifyLevel = model.verifyLevel;
  }
}
