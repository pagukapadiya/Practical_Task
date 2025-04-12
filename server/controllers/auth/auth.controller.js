const crypto = require("crypto");
const dotenv = require("dotenv");

const response = require("../../helpers/response.helper");
const models = require("../../models/index");
const jwt = require("../../middleware/jwt.helper");
const common = require("../../helpers/common.helper");
const { sendEmail } = require("../../helpers/email.helper");
dotenv.config();

class AuthController {
  constructor() {
    this.userSignup = this.userSignup.bind(this);
    this.userLogin = this.userLogin.bind(this);
    this.verifyEmailOTP = this.verifyEmailOTP.bind(this);
  }

  /**
   * @name generateAccessToken
   * @description Generates a JWT access token for a user.
   * @param {object} user
   * @returns {object} accessToken
   */
  async generateAccessToken(user) {
    const payload = jwt.generateUserTokenPayload(user);
    const accessToken = await jwt.accessToken(payload);
    return { isSaved: true, accessToken };
  }

  /**
   * @name sendEmailOTP
   * @description Sends an OTP to the user's email using template.
   * @param {object} user
   * @param {string} template
   * @returns {boolean}
   */
  async sendEmailOTP(user, template) {
    const otp = user.email_otp;
    const url = process.env.APP_URL || "http://localhost:3000/email-verify";

    const isEmailSent = await sendEmail({
      to: user.email,
      template,
      replacements: {
        full_name: `${user.first_name} ${user.last_name}`,
        otp: otp,
        verification_link: url,
      },
    });
    return isEmailSent;
  }

  /**
   * @name userSignup
   * @description Registers a new user user.
   * @route POST /api/auth/register-user
   */
  async userSignup(req, res) {
    try {
      const { first_name, last_name, email, password } = req.body;

      const isEmailExists = await models.Users.findOne({ where: { email } });
      if (isEmailExists) {
        return response.errorResponse(req, res, "Email already exists");
      }

      const hashedPassword = crypto
        .createHash("md5")
        .update(password || "")
        .digest("hex");

      const otp = common.generateUniqueId(6, "NUMBER_ONLY");

      const user = await models.Users.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        user_type: 2, // User
        email_otp: otp,
      });

      const isEmailSent = await this.sendEmailOTP(user, "verify_email");
      if (!isEmailSent) {
        throw new Error("Failed to send verification email");
      }

      return response.successResponse(
        req,
        res,
        "User Signup successfully. Verification email sent.",
        {},
        200
      );
    } catch (err) {
      return response.errorResponse(req, res, err.message);
    }
  }

  /**
   * @name userLogin
   * @description Authenticates only users.
   * @route POST /api/auth/user-login
   */
  async userLogin(req, res) {
    try {
      const { email, password } = req.body;

      const user = await models.Users.findOne({
        where: { email },
      });

      if (!user) {
        throw new Error("Invalid email or password");
      }

      const hashedPassword = crypto
        .createHash("md5")
        .update(password || "")
        .digest("hex");

      if (hashedPassword !== user.password) {
        throw new Error("Invalid email or password");
      }

      if (user.is_email_verified !== 1) {
        throw new Error("Please verify your email before login");
      }

      const { accessToken } = await this.generateAccessToken(user);
      const userData = await common.getUserDataById(user.user_id);

      return response.successResponse(
        req,
        res,
        "Login successful",
        {
          accessToken,
          user_data: userData,
        },
        200
      );
    } catch (err) {
      return response.errorResponse(req, res, err.message);
    }
  }

  /**
   * @name verifyEmailOTP
   * @description Verifies the OTP sent to user’s email.
   * @route POST /api/auth/verify-email
   */
  async verifyEmailOTP(req, res) {
    try {
      const { email, verification_otp } = req.body;

      const user = await models.Users.findOne({
        where: {
          email,
          email_otp: verification_otp,
          user_type: [2], // User
        },
      });

      if (!user) {
        return response.errorResponse(req, res, "Invalid OTP");
      }

      user.is_email_verified = 1;
      user.email_otp = null;
      user.otp_expire_time = null;
      await user.save();

      return response.successResponse(
        req,
        res,
        "Email verified successfully",
        {},
        200
      );
    } catch (err) {
      return response.errorResponse(req, res, err.message);
    }
  }
}

module.exports = new AuthController();
