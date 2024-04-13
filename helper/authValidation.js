import Joi from 'joi';

const authModeratorRegistrationValidation = Joi.object({
  firstName: Joi.string().min(3).max(40).trim().required(),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .message(
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    )
    .required(),
  verifyLevel: Joi.number().positive().required(),
});

const authLoginValidation = Joi.object({
  firstName: Joi.string().trim().required(),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .message(
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    )
    .required(),
});

const authAdminRegistrationValidation = Joi.object({
  firstName: Joi.string().min(3).max(40).trim().required(),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .message(
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    )
    .required(),
});

export {
  authModeratorRegistrationValidation,
  authLoginValidation,
  authAdminRegistrationValidation,
};
