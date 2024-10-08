const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Employee = sequelize.define('Employee', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: DataTypes.STRING,
    hourlyRate: DataTypes.FLOAT,
    employmentType: {
      type: DataTypes.ENUM('agency', 'dispatch', 'outsourcing'),
      allowNull: false
    },
    socialSecurityNumber: DataTypes.STRING,
    bankAccount: DataTypes.STRING
  });

  return Employee;
};