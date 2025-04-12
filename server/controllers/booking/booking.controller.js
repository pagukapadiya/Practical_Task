const { Op } = require("sequelize");
const response = require("../../helpers/response.helper");
const models = require("../../models/index");
const moment = require("moment");

class BookingController {
  constructor() {
    this.addBooking = this.addBooking.bind(this);
  }

  async addBooking(req, res) {
    try {
      const {
        customer_name,
        customer_email,
        booking_date,
        booking_type,
        booking_slot,
        booking_from,
        booking_to,
      } = req.body;

      const date = moment(booking_date).format("YYYY-MM-DD");

      // Parse times for comparison
      const fromTime = booking_from
        ? moment(`${date} ${booking_from}`).format("HH:mm:ss")
        : null;
      const toTime = booking_to
        ? moment(`${date} ${booking_to}`).format("HH:mm:ss")
        : null;

      // Fixed slots for half-day bookings
      const firstHalfStart = "08:00:00";
      const firstHalfEnd = "12:00:00";
      const secondHalfStart = "13:00:00";
      const secondHalfEnd = "17:00:00";

      // Initialize variables for booking_from and booking_to
      let newBookingFrom = null;
      let newBookingTo = null;

      // Handle Full Day Booking
      if (booking_type == 1) {
        newBookingFrom = "00:00:00"; // Full day, entire day from midnight to midnight
        newBookingTo = "23:59:59";
      }
      // Handle Half Day Booking
      else if (booking_type == 2) {
        if (booking_slot == 1) {
          // First Half booking
          newBookingFrom = firstHalfStart;
          newBookingTo = firstHalfEnd;
        } else if (booking_slot == 2) {
          // Second Half booking
          newBookingFrom = secondHalfStart;
          newBookingTo = secondHalfEnd;
        }
      }
      // Handle Custom Booking
      else if (booking_type == 3) {
        newBookingFrom = fromTime; // Custom start time
        newBookingTo = toTime; // Custom end time
      }

      // Check for conflicts with existing bookings
      const existingBooking = await models.Bookings.findOne({
        where: {
          booking_date: date,
          [Op.or]: [
            // Full day booking: no other booking allowed on the same day
            { booking_type: 1 },
            // Half day booking: check conflicting time slots
            {
              booking_type: 2,
              [Op.or]: [
                {
                  booking_slot: 1, // First Half
                  booking_from: { [Op.lt]: newBookingTo }, // Check overlap
                  booking_to: { [Op.gt]: newBookingFrom },
                },
                {
                  booking_slot: 2, // Second Half
                  booking_from: { [Op.lt]: newBookingTo }, // Check overlap
                  booking_to: { [Op.gt]: newBookingFrom },
                },
              ],
            },
            // Custom booking: check for time overlap
            {
              booking_type: 3,
              booking_from: { [Op.lt]: newBookingTo }, // Check overlap
              booking_to: { [Op.gt]: newBookingFrom },
            },
          ],
        },
      });

      if (existingBooking) {
        throw new Error(
          "The selected time slot is already booked. Please choose another time."
        );
      }

      // Proceed with creating the booking
      const booking = await models.Bookings.create({
        customer_name,
        customer_email,
        booking_date: date,
        booking_type,
        booking_slot: booking_type == 2 ? booking_slot : null,
        booking_from: newBookingFrom,
        booking_to: newBookingTo,
      });

      return response.successResponse(
        req,
        res,
        "Booking created successfully",
        { data: booking },
        200
      );
    } catch (err) {
      return response.errorResponse(req, res, err.message);
    }
  }
}

module.exports = new BookingController();
