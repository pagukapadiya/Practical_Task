import React, { useState } from "react";
import { Formik } from "formik";
import { Container, Form, Card, Row, Col, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import "../../../assets/scss/page/authForm.scss";
import { TNButton } from "../../../common/components";
import { useRegister } from "../../../hooks";
import validationSchema from "./SignupValidation";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  /**
   * !This API will call when user click on Submit Button, and user will be redirected to the Verification page
   */
  const { mutate: doRegister, isPending } = useRegister((response) => {
    toast.success(response.message);
    navigate("/email-verify");
  });

  /**
   * This function will call when user clicks on login Button link.
   */
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Container fluid className="admin-register-page">
      <Row className="justify-content-center align-items-center vh-100">
        <Col xs={11} sm={10} md={8} lg={5}>
          <Card className="p-4 shadow-sm border-0">
            <Card.Body>
              <h3 className="text-center mb-4">Signup</h3>
              <Formik
                initialValues={{
                  first_name: "",
                  last_name: "",
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log("Form Submitted:", values);
                  doRegister(values);
                }}
              >
                {(formik) => (
                  <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="first_name" className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        {...formik.getFieldProps("first_name")}
                        isInvalid={
                          formik.touched.first_name && formik.errors.first_name
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.first_name}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="last_name" className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        {...formik.getFieldProps("last_name")}
                        isInvalid={
                          formik.touched.last_name && formik.errors.last_name
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.last_name}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="email" className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        {...formik.getFieldProps("email")}
                        isInvalid={formik.touched.email && formik.errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="password" className="mb-4">
                      <Form.Label>Password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          {...formik.getFieldProps("password")}
                          isInvalid={
                            formik.touched.password && formik.errors.password
                          }
                        />
                        <InputGroup.Text
                          className={
                            "" +
                            (formik.touched.password && formik.errors.password
                              ? "form-field-error"
                              : formik.touched.password &&
                                !formik.errors.password
                              ? "form-field-success"
                              : "")
                          }
                        >
                          <FontAwesomeIcon
                            onClick={() =>
                              setShowPassword((prevState) => !prevState)
                            }
                            icon={showPassword ? faEye : faEyeSlash}
                          />
                        </InputGroup.Text>
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.password}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <div className="link-right">
                      <span style={{ color: "#424242", fontWeight: "500" }}>
                        Already have an account ?
                      </span>{" "}
                      <span className="resend-otp" onClick={handleLogin}>
                        Login
                      </span>
                    </div>
                    <div className="primary-button">
                      <TNButton
                        type="submit"
                        variant="primary"
                        isdirtyform={formik.dirty && formik.isValid ? 1 : 0}
                        loading={isPending}
                      >
                        Signup
                      </TNButton>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
