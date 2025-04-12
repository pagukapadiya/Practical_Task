import React from "react";
import { useFormik } from "formik";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";

import { TNBreadCurm, TNButton } from "../../common/components";
import validationSchema from "./BookingValidation";
import { useAddBooking } from "../../hooks";
import "../../assets/scss/page/_editprofile.scss";

const AddBookingPage = () => {
  const navigate = useNavigate();

  /**
   * Executes booking submission.
   * On success, displays toast and redirects to dashboard.
   */
  const { mutate: doAddBooking, isPending } = useAddBooking((res) => {
    toast.success(res.message);
    navigate("/dashboard");
  });

  // Dropdown options for booking type
  const booking_typeOptions = [
    { value: "", label: "Select Booking Type" },
    { value: "1", label: "Full Day" },
    { value: "2", label: "Half Day" },
    { value: "3", label: "Custom" },
  ];

  // Dropdown options for booking slot (used in Half Day)
  const booking_slotOptions = [
    { value: "", label: "Select Booking Slot" },
    { value: "1", label: "First Half" },
    { value: "2", label: "Second Half" },
  ];

  // Breadcrumbs for navigation
  const breadcurmArray = [
    { label: "Dashboard", link: "/dashboard", active: "" },
    { label: "Add Booking", link: "", active: "active" },
  ];

  // Formik form initialization
  const formik = useFormik({
    initialValues: {
      customer_name: "",
      customer_email: "",
      booking_date: "",
      booking_type: "",
      booking_slot: "",
      booking_from: "",
      booking_to: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      doAddBooking(values);
    },
  });

  return (
    <>
      <TNBreadCurm breadcurmArray={breadcurmArray} />
      <Card className="inner-box">
        <h1 className="page-heading-center">Add Booking</h1>
        <div>
          <Form className="edit-profile-form" onSubmit={formik.handleSubmit}>
            <Row>
              <Col lg={6}>
                <Form.Group>
                  <Form.Label className="field-label field-label-top">
                    Customer Name
                  </Form.Label>
                  <Form.Control
                    className={
                      "form-field " +
                      (formik.touched.customer_name &&
                      formik.errors.customer_name
                        ? "form-field-error"
                        : formik.touched.customer_name &&
                          !formik.errors.customer_name
                        ? "form-field-success"
                        : "")
                    }
                    type="text"
                    name="customer_name"
                    placeholder="Enter Customer Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.customer_name}
                  />
                  <div className="form-field-error-text">
                    {formik.touched.customer_name &&
                      formik.errors.customer_name && (
                        <div>{formik.errors.customer_name}</div>
                      )}
                  </div>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group>
                  <Form.Label className="field-label field-label-top">
                    Customer Email
                  </Form.Label>
                  <Form.Control
                    className={
                      "form-field " +
                      (formik.touched.customer_email &&
                      formik.errors.customer_email
                        ? "form-field-error"
                        : formik.touched.customer_email &&
                          !formik.errors.customer_email
                        ? "form-field-success"
                        : "")
                    }
                    type="email"
                    name="customer_email"
                    placeholder="Enter Customer Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.customer_email}
                  />
                  <div className="form-field-error-text">
                    {formik.touched.customer_email &&
                      formik.errors.customer_email && (
                        <div>{formik.errors.customer_email}</div>
                      )}
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={6}>
                <Form.Group>
                  <Form.Label className="field-label field-label-top">
                    Booking Date
                  </Form.Label>
                  <Form.Control
                    className={
                      "form-field " +
                      (formik.touched.booking_date && formik.errors.booking_date
                        ? "form-field-error"
                        : formik.touched.booking_date &&
                          !formik.errors.booking_date
                        ? "form-field-success"
                        : "")
                    }
                    type="date"
                    name="booking_date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.booking_date}
                  />
                  <div className="form-field-error-text">
                    {formik.touched.booking_date &&
                      formik.errors.booking_date && (
                        <div>{formik.errors.booking_date}</div>
                      )}
                  </div>
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group>
                  <Form.Label className="field-label field-label-top">
                    Booking Type
                  </Form.Label>
                  <Select
                    options={booking_typeOptions}
                    placeholder="Select Booking Type"
                    value={booking_typeOptions.find(
                      (opt) => opt.value === formik.values.booking_type
                    )}
                    onChange={(option) => {
                      const value = option.value;
                      formik.setFieldValue("booking_type", value);

                      // Reset dependent fields based on booking type
                      if (value === "1") {
                        formik.setFieldValue("booking_slot", "");
                        formik.setFieldValue("booking_from", "");
                        formik.setFieldValue("booking_to", "");
                      } else if (value === "2") {
                        formik.setFieldValue("booking_slot", "");
                        formik.setFieldValue("booking_from", "");
                        formik.setFieldValue("booking_to", "");
                      } else if (value === "3") {
                        formik.setFieldValue("booking_slot", "");
                      }
                    }}
                  />
                  <div className="form-field-error-text">
                    {formik.touched.booking_type &&
                      formik.errors.booking_type && (
                        <div>{formik.errors.booking_type}</div>
                      )}
                  </div>
                </Form.Group>
              </Col>
            </Row>

            {formik.values.booking_type === "2" && (
              <Row>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label className="field-label field-label-top">
                      Booking Slot
                    </Form.Label>
                    <Select
                      options={booking_slotOptions}
                      placeholder="Select Booking Slot"
                      value={booking_slotOptions.find(
                        (opt) => opt.value === formik.values.booking_slot
                      )}
                      onChange={(option) =>
                        formik.setFieldValue("booking_slot", option.value)
                      }
                    />
                    <div className="form-field-error-text">
                      {formik.touched.booking_slot &&
                        formik.errors.booking_slot && (
                          <div>{formik.errors.booking_slot}</div>
                        )}
                    </div>
                  </Form.Group>
                </Col>
              </Row>
            )}

            {formik.values.booking_type === "3" && (
              <Row>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label className="field-label field-label-top">
                      From Time
                    </Form.Label>
                    <Form.Control
                      type="time"
                      name="booking_from"
                      className={
                        "form-field " +
                        (formik.touched.booking_from &&
                        formik.errors.booking_from
                          ? "form-field-error"
                          : formik.touched.booking_from &&
                            !formik.errors.booking_from
                          ? "form-field-success"
                          : "")
                      }
                      value={formik.values.booking_from}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <div className="form-field-error-text">
                      {formik.touched.booking_from &&
                        formik.errors.booking_from && (
                          <div>{formik.errors.booking_from}</div>
                        )}
                    </div>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label className="field-label field-label-top">
                      To Time
                    </Form.Label>
                    <Form.Control
                      type="time"
                      name="booking_to"
                      className={
                        "form-field " +
                        (formik.touched.booking_to && formik.errors.booking_to
                          ? "form-field-error"
                          : formik.touched.booking_to &&
                            !formik.errors.booking_to
                          ? "form-field-success"
                          : "")
                      }
                      value={formik.values.booking_to}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <div className="form-field-error-text">
                      {formik.touched.booking_to &&
                        formik.errors.booking_to && (
                          <div>{formik.errors.booking_to}</div>
                        )}
                    </div>
                  </Form.Group>
                </Col>
              </Row>
            )}

            <div className="primary-button">
              <TNButton
                type="submit"
                isdirtyform={formik.dirty ? 1 : 0}
                loading={isPending}
              >
                Save
              </TNButton>
            </div>
          </Form>
        </div>
      </Card>
    </>
  );
};

export default AddBookingPage;
