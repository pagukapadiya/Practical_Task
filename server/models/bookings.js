"use strict";
const sequelizePaginate = require("sequelize-paginate");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bookings.init(
    {
      booking_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      customer_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      customer_email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      booking_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null,
      },
      booking_type: {
        type: DataTypes.BOOLEAN,
        comment: "1=>Full_day,2=>Half_day,3=>Custom",
        defaultValue: null,
        allowNull: true,
        get() {
          if (this.getDataValue("booking_type") === true) return 1;
          return this.getDataValue("booking_type");
        },
      },
      booking_slot: {
        type: DataTypes.BOOLEAN,
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
        type: DataTypes.TIME,
        defaultValue: null,
        comment: "Booking From time",
      },
      booking_to: {
        allowNull: true,
        type: DataTypes.TIME,
        defaultValue: null,
        comment: "slot end time",
      },
      created_at: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: null,
      },
      updated_at: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: null,
      },
      deleted_at: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },

    {
      sequelize,
      modelName: "Bookings",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      timestamps: true,
      paranoid: true,
      tableName: "bookings",
    }
  );
  sequelizePaginate.paginate(Bookings);
  return Bookings;
};
