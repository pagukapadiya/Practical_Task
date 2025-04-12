"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      first_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      user_type: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        comment: "1=>Admin,2=>User",
        defaultValue: 2,
        get() {
          if (this.getDataValue("user_type") === true) return 1;
          return this.getDataValue("user_type");
        },
      },
      is_email_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        comment: "1=>verified,2=>Not verified",
        defaultValue: 2,
        get() {
          if (this.getDataValue("is_email_verified") === true) return 1;
          return this.getDataValue("is_email_verified");
        },
      },
      email_otp: {
        type: Sequelize.STRING(6),
        allowNull: true,
        defaultValue: null,
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
    await queryInterface.dropTable("users");
  },
};
