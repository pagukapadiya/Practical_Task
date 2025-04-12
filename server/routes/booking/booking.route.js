const express = require("express");
const { validate } = require("express-validation");
const BookingValidator = require("../../controllers/booking/booking.validation");
const BookingController = require("../../controllers/booking/booking.controller");
const jwt = require("../../middleware/jwt.helper");

const router = express.Router();

router.post(
  "/add",
  jwt.verifyAccessToken,
  validate(BookingValidator.addBookingValidation(), {}, {}),
  BookingController.addBooking
);

module.exports = router;
