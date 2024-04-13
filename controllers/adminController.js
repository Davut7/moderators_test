import adminService from '../services/adminService.js';
import {
  authLoginValidation,
  authAdminRegistrationValidation,
} from '../helper/authValidation.js';

class AdminController {
  async adminRegistration(req, res) {
    const { firstName, password } = req.body;
    const { error } = authAdminRegistrationValidation.validate(req.body, {
      abortEarly: true,
    });
    if (error) throw createError.BadRequest(error.details[0].message);
    const admin = await adminService.adminRegistration(firstName, password);
    res.status(200).json({
      message: 'admin signup successfully',
      admin,
    });
  }

  async adminLogin(req, res) {
    const { firstName, password } = req.body;
    const { error } = authLoginValidation.validate(req.body, {
      abortEarly: true,
    });
    if (error) throw createError.BadRequest(error.details[0].message);
    const admin = await adminService.adminLogin(firstName, password);
    res.cookie('refreshToken', admin.refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: 'Login successful',
      admin,
    });
  }

  async adminRefreshTokens(req, res) {
    const { refreshToken } = req.cookies;
    const admin = await adminService.adminRefreshTokens(refreshToken);
    res.cookie('refreshToken', admin.refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: 'Refresh tokens successful',
      admin,
    });
  }

  async adminLogout(req, res) {
    const { refreshToken } = req.cookies;
    await adminService.adminLogout(refreshToken);
    res.clearCookie('refreshToken');
    res.json({ message: 'Logout successful' });
  }
}

export default new AdminController();
