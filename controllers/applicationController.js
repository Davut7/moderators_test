import applicationService from '../services/applicationService.js';

class ApplicationController {
  async createApplication(req, res) {
    const application = await applicationService.createApplication(req.body);
    return res.status(201).json(application);
  }

  async getApplications(req, res) {
    const applications = await applicationService.getApplications(req.query);
    return res.status(200).json(applications);
  }

  async getOneApplication(req, res) {
    const { applicationId } = req.params;
    console.log(req.params);
    const application = await applicationService.getOneApplication(
      applicationId,
    );
    return res.status(200).json(application);
  }

  async deleteApplication(req, res) {
    const { applicationId } = req.params;
    await applicationService.deleteApplication(applicationId);
    return res
      .status(200)
      .json({ message: 'Application deleted successfully!' });
  }

  async updateApplication(req, res) {
    const { applicationId } = req.params;
    const application = await applicationService.updateApplication(
      applicationId,
    );
    return res.status(200).json(application);
  }

  async verifyApplication(req, res) {
    const { applicationId } = req.params;
    const currentUser = req.user;
    const dto = req.body;
    const application = await applicationService.verifyApplication(
      applicationId,
      currentUser,
      dto,
    );
    return res.status(200).json(application);
  }
}

export default new ApplicationController();
