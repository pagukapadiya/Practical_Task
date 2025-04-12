# Booking System with Authentication

## 🚀 Overview

This project implements a high-performance **booking system** with **user authentication**. The system allows users to sign up, log in, and make bookings while ensuring booking conflicts and overlaps are prevented.

- **User Registration and Login** with Email Verification
- **Booking Form** for Customers with Date, Time, and Type Selection
- **Conflict Prevention** for Booking Overlaps based on Date, Time, and Type
- **Optimized for Performance** to handle 10k bookings/day with 1M existing records

## 🛠️ Tech Stack

- **Frontend**: React.js, Bootstrap
- **Backend**: Node.js, Sequelize, MySQL
- **State Management**: Redux (optional)
- **Authentication**: JWT-based authentication with Email Verification

## 📝 Features

### **Authentication**
- **Sign Up**: User registration with fields:
  - First Name, Last Name, Email, Password
  - Email verification required for login
  - Duplicate email addresses are restricted
  - Form validation for all fields

- **Login**: User login after email verification
  - Roles: Customer and Admin (Admin access restrictions can be added as needed)

### **Booking Form (After Login)**
- **Fields**:
  - Customer Name, Customer Email
  - Booking Date
  - Booking Type (Full Day, Half Day, Custom)
  - Booking Slot (First Half, Second Half – visible if Booking Type is Half Day)
  - Booking Time (visible if Booking Type is Custom)

### **Booking Rules & Conflict Prevention**
- **No duplicate bookings** on the same day:
  - Full Day bookings block all other bookings for the same day.
  - Half Day bookings block the corresponding slot (e.g., First Half).
  - Custom bookings block overlapping time slots with other bookings (e.g., a 10 AM – 11 AM Custom booking prevents Full Day or Half Day First Half bookings).

### **Performance**
- Optimized to handle **10k bookings/day** and **1M existing records**.
- Efficient conflict detection algorithms to ensure fast performance even with large datasets.

