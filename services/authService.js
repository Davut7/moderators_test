import bcrypt from 'bcrypt';
import createError from 'http-errors';
import tokenService from './tokenService.js';
import ModeratorDto from '../Dto/ModeratorDto.js';
import { Moderator } from '../models/Model.js';
class AuthService {
  async moderatorRegistration(firstName, password, verifyLevel) {
    const candidate = await Moderator.findOne({
      where: { firstName: firstName },
    });
    if (candidate)
      throw createError.Conflict(
        `Moderator with firstName ${firstName} already exists`,
      );
    const hashedPassword = await bcrypt.hash(password, 10);
    const moderator = await Moderator.create({
      firstName: firstName,
      password: hashedPassword,
      verifyLevel: verifyLevel,
    });
    const moderatorDto = new ModeratorDto(moderator);
    const tokens = tokenService.generateTokens({ ...moderatorDto });
    await tokenService.saveToken(moderator.id, tokens.refreshToken);
    return {
      id: moderator.id,
      firstName: moderator.firstName,
      ...tokens,
    };
  }

  async moderatorLogin(firstName, password) {
    const moderator = await Moderator.findOne({
      where: { firstName: firstName },
    });
    if (!moderator)
      throw createError.BadRequest(
        `Moderator with firstName ${firstName} not found!`,
      );
    const checkPassword = await bcrypt.compare(password, moderator.password);
    if (!checkPassword) throw createError.BadRequest(`Wrong password!`);
    const moderatorDto = new ModeratorDto(Moderator);
    const tokens = tokenService.generateTokens({ ...moderatorDto });
    await tokenService.saveToken(moderator.id, tokens.refreshToken);
    return {
      id: moderator.id,
      firstName: moderator.firstName,
      ...tokens,
    };
  }

  async moderatorRefreshTokens(refreshToken) {
    if (!refreshToken) throw new createError.Unauthorized();
    const tokenFromDb = await tokenService.findToken(refreshToken);
    const verifiedToken = tokenService.verifyRefreshToken(refreshToken);
    if (!tokenFromDb || !verifiedToken) throw new createError.Unauthorized();
    const moderator = await Moderator.findOne({
      where: { id: tokenFromDb.moderatorId },
      attributes: { exclude: ['password'] },
    });
    const moderatorDto = new ModeratorDto(moderator);
    const tokens = tokenService.generateTokens({ ...moderatorDto });
    await tokenService.saveToken(moderator.id, tokens.refreshToken);
    return {
      id: moderator.id,
      firstName: moderator.firstName,
      ...tokens,
    };
  }

  async moderatorLogout(refreshToken) {
    if (!refreshToken) throw new createError.Unauthorized();
    const token = await tokenService.findToken(refreshToken);
    await tokenService.deleteToken(token.id);
  }

  async getMe(currentModerator) {
    const moderator = await Moderator.findOne({
      where: { id: currentModerator.id },
      attributes: { exclude: ['password'] },
    });
    return moderator;
  }
}

export default new AuthService();
