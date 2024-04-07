import createError from 'http-errors';
import { Application } from '../models/Model.js';

class ApplicationService {
  async createApplication(dto) {
    const application = Application.create(dto);
    return application;
  }

  async getApplications(query) {
    const { take = 10, page = 1 } = query;
    const { rows, count } = await Application.findAndCountAll({
      offset: (page - 1) * take,
      limit: take,
    });

    return {
      applications: rows,
      applicationsCount: count,
    };
  }

  async getOneApplication(applicationId) {
    const application = await Application.findOne({
      where: { id: applicationId },
    });
    if (!application) throw new createError.NotFound('Application not found');
    return application;
  }

  async deleteApplication(applicationId) {
    const application = await this.getOneApplication(applicationId);
    await Application.destroy({ where: { id: application.id } });
    return {
      message: 'Application deleted successfully!',
    };
  }

  async updateApplication(applicationId) {
    const application = await this.getOneApplication(applicationId);
    return await Application.save(application);
  }

  async verifyApplication(applicationId, currentUser, dto) {
    const application = await Application.findOne({
      where: { id: applicationId },
    });

    if (!application) {
      throw new createError.NotFound('Application not found');
    }

    if (currentUser.verifyLevel < application.checkLevel) {
      throw new createError.Conflict(
        `You do not have permission to update this application. Your verify level is ${currentUser.verifyLevel}, application check level is ${application.checkLevel}`,
      );
    }

    if (dto.denialReason) {
      application.denialReason = dto.denialReason;
    }
    if (currentUser.verifyLevel - application.checkLevel === 1) {
      application.checkLevel += 1;

      await application.save();

      return application;
    } else {
      throw new createError.Forbidden(
        `You do not have permission to update this application. Your verify level is ${currentUser.verifyLevel}, application check level is ${application.checkLevel}`,
      );
    }
  }
}

export default new ApplicationService();
