const express = require("express");
const { validate } = require("express-validation");
const AuthValidator = require("../../controllers/auth/auth.validation");
const AuthController = require("../../controllers/auth/auth.controller");

const router = express.Router();

router.post(
  "/signup",
  validate(AuthValidator.registerValidation(), {}, {}),
  AuthController.userSignup
);

router.post(
  "/login",
  validate(AuthValidator.userLoginValidation(), {}, {}),
  AuthController.userLogin
);

router.post(
  "/verify-email",
  validate(AuthValidator.verifyEmailOtpValidation(), {}, {}),
  AuthController.verifyEmailOTP
);

module.exports = router;
