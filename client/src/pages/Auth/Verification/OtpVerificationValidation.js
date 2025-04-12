import * as Yup from "yup";

let validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  verification_otp: Yup.string()
    .required("OTP is required")
    .matches(/^[0-9\s]+$/, "OTP must contain only numbers"),
});

export default validationSchema;
