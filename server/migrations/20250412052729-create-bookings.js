"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bookings", {
      booking_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      customer_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      customer_email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      booking_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        defaultValue: null,
      },
      booking_type: {
        type: Sequelize.BOOLEAN,
        comment: "1=>Full_day,2=>Half_day,3=>Custom",
        defaultValue: null,
        allowNull: true,
        get() {
          if (this.getDataValue("booking_type") === true) return 1;
          return this.getDataValue("booking_type");
        },
      },
      booking_slot: {
        type: Sequelize.BOOLEAN,
        comment: "1=>First_half,2=>Second_half",
        defaultValue: null,
        allowNull: true,
        get() {
          if (this.getDataValue("booking_slot") === true) return 1;
          return this.getDataValue("booking_slot");
        },
      },
      booking_from: {
        allowNull: true,
        type: Sequelize.TIME,
        defaultValue: null,
        comment: "Booking From time",
      },
      booking_to: {
        allowNull: true,
        type: Sequelize.TIME,
        defaultValue: null,
        comment: "slot end time",
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("bookings");
  },
};
