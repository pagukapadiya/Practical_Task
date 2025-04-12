// This Route file.
const authRoute = require("./auth/auth.route");
const bookingRoute = require("./booking/booking.route");

const { HOST_URL_PREFIX } = process.env;
module.exports = (app) => {
  /** All Routes */
  app.use(`${HOST_URL_PREFIX}/user`, authRoute);
  app.use(`${HOST_URL_PREFIX}/booking`, bookingRoute);
};
