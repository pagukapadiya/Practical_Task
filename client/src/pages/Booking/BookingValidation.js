import * as Yup from "yup";

let validationSchema = Yup.object({
  customer_name: Yup.string().required("Customer Name is required"),
  customer_email: Yup.string()
    .email("Invalid email")
    .required("Customer Email is required"),
  booking_date: Yup.string().required("Booking Date is required"),
  booking_type: Yup.string().required("Booking Type is required"),
  booking_slot: Yup.string()
    .nullable()
    .when("booking_type", {
      is: "2",
      then: (schema) => schema.required("Booking Slot is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  booking_from: Yup.string()
    .nullable()
    .when("booking_type", {
      is: "3",
      then: (schema) => schema.required("From Time is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  booking_to: Yup.string()
    .nullable()
    .when("booking_type", {
      is: "3",
      then: (schema) => schema.required("To Time is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export default validationSchema;
