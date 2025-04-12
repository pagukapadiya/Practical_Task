import { React } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import { useOTPVerify } from "../../../hooks";
import validationSchema from "./OtpVerificationValidation";
import { LogoUrl } from "../../../common/layouts";
import { TNButton } from "../../../common/components";

const OtpVerificationPage = () => {
  const navigate = useNavigate();

  /**
   * This Block will execute on Verify OTP. On success we'll redirect login
   */
  const { mutate: doOtpVerify, isPending } = useOTPVerify((res) => {
    toast.success(res.message);
    navigate("/login");
  });

  /**
   * This Block will execute on Form Submit, provides form fields and validations for that
   */
  const formik = useFormik({
    initialValues: {
      verification_otp: "",
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      doOtpVerify(values);
    },
  });
  return (
    <Container>
      <div className="background-box">
        <div>
          <div className="brand-logo">
            <LogoUrl />
          </div>
          <div className="admin-heading">
            <h1 className="page-heading-center">OTP Verification</h1>
          </div>
          <div>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="field-label">Email</Form.Label>
                <Form.Control
                  className={
                    "form-field " +
                    (formik.touched.email && formik.errors.email
                      ? "form-field-error"
                      : formik.touched.email && !formik.errors.email
                      ? "form-field-success"
                      : "")
                  }
                  type="text"
                  name="email"
                  placeholder={"Enter your email"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <div className="form-field-error-text">
                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </div>
              </Form.Group>
              <div>
                <Form.Label className="field-label field-label-top">
                  Verification OTP
                </Form.Label>
                <Form.Control
                  className={
                    "form-field " +
                    (formik.touched.verification_otp &&
                    formik.errors.verification_otp
                      ? "form-field-error"
                      : formik.touched.verification_otp &&
                        !formik.errors.verification_otp
                      ? "form-field-success"
                      : "")
                  }
                  type="text"
                  name="verification_otp"
                  maxLength="6"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  placeholder={"Enter your OTP"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.verification_otp}
                />
                {formik.touched.verification_otp &&
                formik.errors.verification_otp ? (
                  <div className="form-field-error-text">
                    {formik.errors.verification_otp}
                  </div>
                ) : null}
              </div>
              <div className="primary-button">
                <Link to="/login" className="link-center">
                  Cancel
                </Link>
                <TNButton loading={isPending} type="submit">
                  Submit
                </TNButton>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OtpVerificationPage;
