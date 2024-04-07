import authService from '../services/authService.js';
import createError from 'http-errors';
import {
  authLoginValidation,
  authRegistrationValidation,
} from '../helper/authValidation.js';

class AuthController {
  async moderatorRegistration(req, res) {
    const { verifyLevel, firstName, password } = req.body;
    const { error } = authRegistrationValidation.validate(req.body, {
      abortEarly: true,
    });
    if (error) throw createError.BadRequest(error.details[0].message);
    const moderator = await authService.moderatorRegistration(
      firstName,
      password,
      verifyLevel,
    );
    res.cookie('refreshToken', moderator.refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: 'moderator signup successfully',
      moderator,
    });
  }

  async moderatorLogin(req, res) {
    const { firstName, password } = req.body;
    console.log(firstName);
    const { error } = authLoginValidation.validate(req.body, {
      abortEarly: true,
    });
    if (error) throw createError.BadRequest(error.details[0].message);
    const moderator = await authService.moderatorLogin(firstName, password);
    res.cookie('refreshToken', moderator.refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: 'Login successful',
      moderator,
    });
  }

  async moderatorRefreshTokens(req, res) {
    const { refreshToken } = req.cookies;
    const moderator = await authService.moderatorRefreshTokens(refreshToken);
    res.cookie('refreshToken', moderator.refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: 'Refresh tokens successful',
      moderator,
    });
  }

  async moderatorLogout(req, res) {
    const { refreshToken } = req.cookies;
    const currentModerator = req.moderator;
    await authService.moderatorLogout(refreshToken, currentModerator);
    res.clearCookie('refreshToken');
    res.json({ message: 'Logout successful' });
  }

  async getMe(req, res) {
    const currentModerator = req.moderator;
    const moderator = await authService.getMe(currentModerator);
    res.status(200).json({
      message: 'Refresh tokens successful',
      moderator,
    });
  }
}

export default new AuthController();
