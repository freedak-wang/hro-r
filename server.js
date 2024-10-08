const express = require('express');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// 中间件
app.use(express.json());
app.use(cors());

// 设置 Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_PATH || './hr_reconciliation.db'
});

// 测试数据库连接
sequelize.authenticate()
  .then(() => console.log('数据库已连接'))
  .catch(err => console.log('错误: ' + err));

// 导入模型
const Client = require('./models/Client')(sequelize);
const Contract = require('./models/Contract')(sequelize);
const Employee = require('./models/Employee')(sequelize);
const FinancialDocument = require('./models/FinancialDocument')(sequelize);

// 设置关联
Client.hasMany(Contract);
Contract.belongsTo(Client);
Client.hasMany(Employee);
Employee.belongsTo(Client);
Contract.hasMany(Employee);
Employee.belongsTo(Contract);
Client.hasMany(FinancialDocument);
FinancialDocument.belongsTo(Client);
Contract.hasMany(FinancialDocument);
FinancialDocument.belongsTo(Contract);
Employee.hasMany(FinancialDocument);
FinancialDocument.belongsTo(Employee);

// 同步所有模型到数据库
sequelize.sync({ force: true })
  .then(() => console.log('数据库和表已创建！'));

// 路由
const clientsRouter = require('./routes/clients');
const contractsRouter = require('./routes/contracts');
const employeesRouter = require('./routes/employees');
const financialDocumentsRouter = require('./routes/financialDocuments');
const importRouter = require('./routes/import');

app.use('/api/clients', clientsRouter(Client));
app.use('/api/contracts', contractsRouter(Contract));
app.use('/api/employees', employeesRouter(Employee));
app.use('/api/financial-documents', financialDocumentsRouter(FinancialDocument));
app.use('/api/import', importRouter(Client, Contract, Employee, FinancialDocument));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`服务器运行在端口 ${PORT}`));