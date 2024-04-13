import xlsx from 'xlsx';
import { unlink } from 'fs/promises';
import { Users } from '../models/Model.js';
import bcrypt from 'bcrypt';
import createError from 'http-errors';
import qrImage from 'qr-image';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

export class UserService {
  async getUsers() {
    const users = await Users.findAll();
    return users;
  }

  async uploadUsers(file) {
    const workbook = xlsx.readFile(file.path);

    const sheetName = workbook.SheetNames[0];

    const worksheet = workbook.Sheets[sheetName];

    const usersData = xlsx.utils.sheet_to_json(worksheet);

    await unlink(file.path);

    for (const userData of usersData) {
      const [firstName, password, sex] = Object.values(userData)
        .join('')
        .split(/\s+/);

      const hashedPassword = await bcrypt.hash(password, 10);

      await Users.create({
        lastName: '1',
        firstName: firstName,
        sex: sex,
        password: hashedPassword,
      });
    }
  }

  async verifyUsers(userId, currentUser, dto) {
    const user = await Users.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new createError.NotFound('User not found');
    }

    if (currentUser.verifyLevel < user.checkLevel) {
      throw new createError.Conflict(
        `You do not have permission to update this user. Your verify level is ${currentUser.verifyLevel}, user check level is ${user.checkLevel}`,
      );
    }

    if (dto.denialReason) {
      user.denialReason = dto.denialReason;
      user.status = 'unverified';
    }
    if (currentUser.verifyLevel - user.checkLevel === 1) {
      user.checkLevel += 1;

      if (user.checkLevel === 5) {
        const qrcode = this.generateQrCode({
          firstName: user.firstName,
          lastName: user.lastName,
          sex: user.sex,
        });
        user.status = 'verified';
        user.qrCodeImage = qrcode;
      }

      await user.save();

      return user;
    } else {
      throw new createError.Forbidden(
        `You do not have permission to update this user. Your verify level is ${currentUser.verifyLevel}, user check level is ${user.checkLevel}`,
      );
    }
  }

  async generateQrCode(userData) {
    const data = JSON.stringify(userData);
    const qrCodeImage = qrImage.imageSync(data, { type: 'png' });

    const uniqueFilename = `images/qrcode-${uuidv4()}.png`;
    fs.writeFileSync(uniqueFilename, qrCodeImage);

    return uniqueFilename;
  }

  async getOneUser(userId) {
    const user = await Users.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new createError.NotFound('User not found');
    }

    return user;
  }
}

export default new UserService();
