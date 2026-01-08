const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Job = sequelize.define("Job", {
  taskName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  payload: {
    type: DataTypes.JSON
  },
  priority: {
    type: DataTypes.ENUM("low", "medium", "high"),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("pending", "running", "completed", "failed"),
    defaultValue: "pending"
  }
}, {
  tableName: "jobs",
  timestamps: true
});

module.exports = Job;
