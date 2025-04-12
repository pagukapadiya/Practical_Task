const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const models = require('../models/index');

/**
 * Generate an Access Token for authentication
 * @param {Object} payload - The data to embed inside the token
 * @returns {Promise<string>} - Signed JWT access token
 */
const accessToken = (payload) =>
  new Promise((resolve, reject) => {
    const options = {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY, // e.g. "15m"
      issuer: process.env.APP_DOMAIN, // App domain for traceability
    };

    jwt.sign(
      payload,
      process.env.JWT_ACCESS_TOKEN_SECRET,
      options,
      (error, token) => {
        if (error) {
          return reject(createError.InternalServerError());
        }
        resolve(token);
      }
    );
  });

/**
 * Generate a Refresh Token to issue new access tokens
 * @param {Object} payload - The data to embed inside the refresh token
 * @returns {Promise<string>} - Signed JWT refresh token
 */
const refreshToken = (payload) =>
  new Promise((resolve, reject) => {
    const options = {
      // Optionally set expiry like: expiresIn: "7d"
      issuer: process.env.APP_DOMAIN,
    };

    jwt.sign(
      payload,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      options,
      (error, token) => {
        if (error) {
          return reject(createError.InternalServerError());
        }
        resolve(token);
      }
    );
  });

/**
 * Middleware to verify Access Token from headers and authenticate user
 */
const verifyAccessToken = async (req, res, next) => {
  try {
    // Check if authorization header is present
    if (!req.headers.authorization) {
      return next(createError.Unauthorized());
    }

    const authHeader = req.headers.authorization;
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1]; // Extract token from "Bearer <token>"

    let payloadData = '';

    // Verify token using the access token secret
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (error, payload) => {
      if (error) {
        let message = 'Unauthorized';

        // Custom error messages based on JWT error types
        if (error.name === 'TokenExpiredError') {
          message = 'Auth Token is Expired';
        } else if (error.name === 'JsonWebTokenError') {
          message = 'Unauthorized';
        } else {
          message = error.message;
        }

        return next(createError.Unauthorized(message));
      }

      payloadData = payload; // Store payload to attach to request
    });

    // Attach payload to the request
    req.payload = payloadData;

    // Validate if user exists in DB
    if (payloadData) {
      const user = await models.Users.findOne({
        where: { user_id: payloadData.user.user_id },
      });

      if (!user) {
        return next(createError(414, 'Account Not Found'));
      }
    }

    return next();
  } catch (err) {
    return next(createError.InternalServerError());
  }
};

/**
 * Verify the validity of a refresh token
 * @param {string} refreshTokenData - The refresh token to verify
 * @returns {Promise<Object>} - Decoded payload
 */
const verifyRefreshToken = (refreshTokenData) =>
  new Promise((resolve, reject) => {
    jwt.verify(
      refreshTokenData,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      (error, payload) => {
        if (error) {
          return reject(createError.Unauthorized());
        }
        resolve(payload);
      }
    );
  });

/**
 * Structure the user payload to be used in tokens
 * @param {Object} user - User object from DB
 * @returns {Object} - Payload with necessary user fields
 */
const generateUserTokenPayload = (user) => {
  const payload = {
    user: {
      user_id: user.user_id,
      full_name: `${user.first_name} ${user.last_name}`,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      user_type: user.user_type,
    },
    created_at: new Date(), // Useful for token audits or expiration checks
  };
  return payload;
};

module.exports = {
  accessToken,
  refreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateUserTokenPayload,
};
