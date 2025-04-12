const models = require("../models/index");

/**
 *
 * @param data objet
 * @returns object
 * Remove Null Data From Json Obj and set ''
 */
const removeNullDataInResponse = (userData) => {
  userData = JSON.stringify(userData, (key, value) =>
    value === null ? "" : value
  );
  return JSON.parse(userData);
};

/**
 * Generate JWT access token for user
 *
 * @param {object} user
 * @returns {object} { isSaved, accessToken }
 */
const generateAccessToken = async (user) => {
  const payload = jwt.generateUserTokenPayload(user);
  const accessToken = await jwt.accessToken(payload);
  const isSaved = true;
  return { isSaved, accessToken };
};

/**
 *
 * @param Optional
 * @returns Unique no
 * This function is used for generate unique Id
 */

const generateUniqueId = (length = 13, uniqueCharType = "BOTH") => {
  let result = "";

  let characters = "0123456789";

  if (uniqueCharType !== "NUMBER_ONLY") {
    characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  }

  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const getUserDataById = async (user_id) => {
  const getUserData = await models.Users.findOne({
    where: {
      user_id,
    },
  });
  let userData = {};
  if (getUserData) {
    userData = {
      is_email_verified: getUserData.is_email_verified,
      user_id: getUserData.user_id,
      first_name: getUserData.first_name,
      last_name: getUserData.last_name,
      email: getUserData.email,
    };
  }

  return userData;
};

module.exports = {
  removeNullDataInResponse,
  generateAccessToken,
  generateUniqueId,
  getUserDataById,
};
