const { Joi } = require("express-validation");

class AuthValidator {
  userLoginValidation() {
    return {
      body: Joi.object({
        email: Joi.string().max(100).trim().email().required().messages({
          "string.empty": "Email is required",
          "string.email": "Please enter a valid email address",
          "string.max": "Email must not exceed 100 characters",
          "any.required": "Email is required",
        }),
        password: Joi.string().min(6).required().messages({
          "string.empty": "Password is required",
          "string.min": "Password must be at least 6 characters",
          "any.required": "Password is required",
        }),
      }),
    };
  }

  registerValidation() {
    return {
      body: Joi.object({
        first_name: Joi.string().max(50).required().messages({
          "string.empty": "First name is required",
          "string.max": "First name must not exceed 50 characters",
          "any.required": "First name is required",
        }),
        last_name: Joi.string().max(50).required().messages({
          "string.empty": "Last name is required",
          "string.max": "Last name must not exceed 50 characters",
          "any.required": "Last name is required",
        }),
        email: Joi.string().max(100).trim().email().required().messages({
          "string.empty": "Email is required",
          "string.email": "Please enter a valid email address",
          "string.max": "Email must not exceed 100 characters",
          "any.required": "Email is required",
        }),
        password: Joi.string()
          .min(8)
          .max(255)
          .trim(true)
          .pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          )
          .required()
          .messages({
            "string.empty": "Password is required",
            "string.base": "Password must be a valid string",
            "string.min": "Password must be at least 8 characters",
            "string.max": "Password must not exceed 255 characters",
            "string.pattern.base":
              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            "any.required": "Password is required",
          }),
      }),
    };
  }

  verifyEmailOtpValidation() {
    return {
      body: Joi.object({
        email: Joi.string().trim().email().required().messages({
          "string.empty": "Email is required",
          "string.email": "Please enter a valid email address",
          "any.required": "Email is required",
        }),
        verification_otp: Joi.number()
          .integer()
          .min(0)
          .max(999999)
          .required()
          .messages({
            "number.base": "OTP must be a number",
            "any.required": "OTP is required",
            "number.min": "OTP must be at least 6 digits",
            "number.max": "OTP must not exceed 6 digits",
          }),
      }),
    };
  }
}

module.exports = new AuthValidator();
