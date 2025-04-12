import * as Yup from "yup";

let validationSchema = Yup.object({
  first_name: Yup.string()
    .trim()
    .required("First Name is required")
    .test(
      "not-blank",
      "First Name is required",
      (value) => value && value.trim() !== ""
    ),
  last_name: Yup.string()
    .trim()
    .required("Last Name is required")
    .test(
      "not-blank",
      "Last Name is required",
      (value) => value && value.trim() !== ""
    ),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required")
    .test(
      "not-blank",
      "Email is required",
      (value) => value && value.trim() !== ""
    ),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
      "Password must include uppercase, lowercase, number and special character"
    ),
});

export default validationSchema;
