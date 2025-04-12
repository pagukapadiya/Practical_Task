import React from "react";
import { Route, Routes } from "react-router-dom";

/**
 * Booking Routes and pages
 */
const AddBookingPage = React.lazy(() => import("./AddBookingPage"));

const BookingRoutes = () => {
  return (
    <Routes>
      <Route index exact path="/add" element={<AddBookingPage />} />
    </Routes>
  );
};

export default BookingRoutes;
