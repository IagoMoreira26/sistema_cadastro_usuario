const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dataBaseConnection").sequelize;
const User = require("./User");

class Profile extends Model {}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
    },
    surname: {
      type: DataTypes.STRING,
    },
    profile_photo: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "Profile",
    tableName: "profiles",
    timestamps: false,
  }
);

Profile.belongsTo(User, { foreignKey: "user_id", as: "user" });

module.exports = Profile;
