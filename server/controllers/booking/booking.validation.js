const { Joi } = require("express-validation");

class BookingValidator {
  addBookingValidation() {
    return {
      body: Joi.object({
        customer_name: Joi.string().max(50).required().messages({
          "string.empty": "Customer name is required",
          "string.max": "Customer name must not exceed 50 characters",
          "any.required": "Customer name is required",
        }),

        customer_email: Joi.string().email().max(100).required().messages({
          "string.empty": "Customer email is required",
          "string.email": "Please enter a valid email address",
          "string.max": "Customer email must not exceed 100 characters",
          "any.required": "Customer email is required",
        }),

        booking_date: Joi.date().required().messages({
          "date.base": "Booking date must be a valid date",
          "any.required": "Booking date is required",
        }),

        booking_type: Joi.number().valid(1, 2, 3).required().messages({
          "number.base": "Booking type must be a number",
          "any.only":
            "Booking type must be 1 (Full Day), 2 (Half Day), or 3 (Custom)",
          "any.required": "Booking type is required",
        }),

        booking_slot: Joi.when("booking_type", {
          is: 2, // Half Day
          then: Joi.number().valid(1, 2).required().messages({
            "number.base": "Booking slot must be a number",
            "any.only":
              "Booking slot must be 1 (First Half) or 2 (Second Half)",
            "any.required": "Booking slot is required for Half Day bookings",
          }),
          otherwise: Joi.any().optional(),
        }),

        booking_from: Joi.when("booking_type", {
          is: 3, // Custom
          then: Joi.string()
            .pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
            .required()
            .messages({
              "string.empty": "Booking from time is required",
              "string.pattern.base":
                "Booking from time must be in HH:mm format",
              "any.required":
                "Booking from time is required for Custom bookings",
            }),
          otherwise: Joi.any().optional(),
        }),

        booking_to: Joi.when("booking_type", {
          is: 3, // Custom
          then: Joi.string()
            .pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
            .required()
            .messages({
              "string.empty": "Booking to time is required",
              "string.pattern.base": "Booking to time must be in HH:mm format",
              "any.required": "Booking to time is required for Custom bookings",
            }),
          otherwise: Joi.any().optional(),
        }),
      }),
    };
  }
}

module.exports = new BookingValidator();
