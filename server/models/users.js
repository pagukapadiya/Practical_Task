const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({}) {}
  }
  Users.init(
    {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      user_type: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        comment: "1=>Admin,2=>User",
        defaultValue: 2,
        get() {
          if (this.getDataValue("user_type") === true) return 1;
          return this.getDataValue("user_type");
        },
      },
      is_email_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        comment: "1=>verified,2=>Not verified",
        defaultValue: 2,
        get() {
          if (this.getDataValue("is_email_verified") === true) return 1;
          return this.getDataValue("is_email_verified");
        },
      },
      email_otp: {
        type: DataTypes.STRING(6),
        allowNull: true,
        defaultValue: null,
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
      modelName: "Users",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      timestamps: true,
      paranoid: true,
      tableName: "users",
    }
  );
  return Users;
};
