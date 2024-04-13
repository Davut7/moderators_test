import { Admin } from '../models/Model.js';
import createError from 'http-errors';
import bcrypt from 'bcrypt';
import AdminDto from '../Dto/AdminDto.js';
import tokenService from './tokenService.js';

class AdminService {
  async adminRegistration(firstName, password) {
    const admin = await Admin.findOne({
      where: {
        firstName: firstName,
      },
    });

    if (admin) {
      throw new createError.Conflict('Application not found');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      firstName: firstName,
      password: hashedPassword,
    });

    return newAdmin;
  }

  async adminLogin(firstName, password) {
    const admin = await Admin.findOne({
      where: {
        firstName: firstName,
      },
    });

    if (!admin) {
      throw new createError.BadRequest('Admin not found');
    }
    const checkPassword = await bcrypt.compare(password, admin.password);
    if (!checkPassword) {
      throw new createError.BadRequest('Wrong password');
    }
    const adminDto = new Admin(Admin);
    const tokens = tokenService.generateTokens({ ...adminDto });
    await tokenService.saveTokenForAdmins(admin.id, tokens.refreshToken);
    return {
      id: admin.id,
      firstName: admin.firstName,
      ...tokens,
    };
  }

  async adminRefreshTokens(refreshToken) {
    if (!refreshToken) throw new createError.Unauthorized();
    const tokenFromDb = await tokenService.findToken(refreshToken);
    const verifiedToken = tokenService.verifyRefreshToken(refreshToken);
    if (!tokenFromDb || !verifiedToken) throw new createError.Unauthorized();
    const admin = await Admin.findOne({
      where: { id: tokenFromDb.adminId },
      attributes: { exclude: ['password'] },
    });
    const adminDto = new AdminDto(admin);
    const tokens = tokenService.generateTokens({ ...adminDto });
    await tokenService.saveTokenForAdmins(admin.id, tokens.refreshToken);
    return {
      id: admin.id,
      firstName: admin.firstName,
      ...tokens,
    };
  }

  async adminLogout(refreshToken) {
    if (!refreshToken) throw new createError.Unauthorized();
    const token = await tokenService.findToken(refreshToken);
    await tokenService.deleteToken(token.id);
  }
}

export default new AdminService();
