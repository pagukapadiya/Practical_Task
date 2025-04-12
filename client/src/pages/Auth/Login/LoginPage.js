import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Container, Form, InputGroup, FormControl } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { useLogin } from "../../../hooks";
import validationSchema from "./LoginValidation";
import { LogoUrl } from "../../../common/layouts";
import { TNButton } from "../../../common/components";
import { loginSuccess } from "../../../store/features/authSlice";
import { setAuthToken } from "../../../libs/HttpClient";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Show Hide Password
  const [isRevealPwd, setIsRevealPwd] = useState();

  /**
   * This Block is execute on Form Submit when we'll get success response,
   * then we are storing data in Redux using Redux Toolkit.
   */
  const { mutate: doLogin, isPending } = useLogin((res) => {
    const dataStore = {
      userData: res.data.user_data,
      isLoggedIn: true,
      accessToken: res.data.accessToken,
    };
    dispatch(loginSuccess(dataStore));
    setTimeout(function () {
      setAuthToken(res.data.accessToken);
      navigate("/dashboard");
    }, 1500);
    toast.success(res.message);
  });
  /**
   * This Block will execute on Form Submit, provides form fields and validations for that
   */
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      doLogin(values);
    },
  });

  /**
   * This function will call when user clicks on Sign up Button link.
   */
  const handleSignup = () => {
    navigate("/");
  };

  return (
    <Container>
      <div className="background-box">
        <div>
          <div className="brand-logo">
            <LogoUrl />
          </div>
          <div className="login-heading">
            <h1 className="page-heading-center">Login</h1>
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
                  Password
                </Form.Label>
                <InputGroup className="form-group-field">
                  <FormControl
                    className={
                      "" +
                      (formik.touched.password && formik.errors.password
                        ? "form-field-error"
                        : formik.touched.password && !formik.errors.password
                        ? "form-field-success"
                        : "")
                    }
                    name="password"
                    placeholder={"Enter your password"}
                    autoComplete="off"
                    type={isRevealPwd ? "text" : "password"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <InputGroup.Text
                    className={
                      "" +
                      (formik.touched.password && formik.errors.password
                        ? "form-field-error"
                        : formik.touched.password && !formik.errors.password
                        ? "form-field-success"
                        : "")
                    }
                  >
                    <FontAwesomeIcon
                      onClick={() => setIsRevealPwd((prevState) => !prevState)}
                      icon={isRevealPwd ? faEye : faEyeSlash}
                    />
                  </InputGroup.Text>
                </InputGroup>
                <div className="form-field-error-text">
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </div>
              </div>
              <div className="link-right">
                <span style={{ color: "#424242", fontWeight: "500" }}>
                  Don’t have an account ?
                </span>{" "}
                <span className="resend-otp" onClick={handleSignup}>
                  Sign up
                </span>
              </div>
              <div className="primary-button">
                <TNButton loading={isPending} type="submit">
                  Login
                </TNButton>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
