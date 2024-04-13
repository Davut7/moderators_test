import userService from '../services/userService.js';

export class UserController {
  async uploadUsers(req, res) {
    const file = req.file;

    await userService.uploadUsers(file);

    res.status(200).json({
      message: 'Users registered successfully',
    });
  }

  async getUsers(req, res) {
    const users = await userService.getUsers();

    res.status(200).json(users);
  }

  async verifyUsers(req, res) {
    const { userId } = req.params;
    const currentUser = req.user;
    const dto = req.body;
    const application = await userService.verifyUsers(userId, currentUser, dto);

    return res.status(200).json(application);
  }

  async getUser(req, res) {
    const { userId } = req.params;
    const user = await userService.getOneUser(userId);
    res.status(200).json({ user });
  }
}

export default new UserController();
