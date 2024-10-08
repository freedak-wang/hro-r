const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const FinancialDocument = sequelize.define('FinancialDocument', {
    documentType: {
      type: DataTypes.ENUM('clientInvoice', 'paymentReceipt', 'taxInvoice', 'otherIncome', 'socialInsurancePayment', 'housingFundPayment', 'salaryPayment', 'taxPayment', 'commercialInsurancePayment', 'benefitPayment', 'otherExpense'),
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: DataTypes.TEXT,
    fileUrl: DataTypes.STRING
  });

  return FinancialDocument;
};