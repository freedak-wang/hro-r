const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Contract = sequelize.define('Contract', {
    serviceType: {
      type: DataTypes.ENUM('agency', 'dispatch', 'outsourcing'),
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: DataTypes.DATE,
    terms: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM('active', 'completed', 'terminated'),
      defaultValue: 'active'
    }
  });

  return Contract;
};