const express = require('express');
const multer = require('multer');
const csv = require('csv-parse');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

module.exports = (Client, Contract, Employee, FinancialDocument) => {
  const router = express.Router();

  router.post('/clients', upload.single('file'), async (req, res) => {
    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          for (const row of results) {
            await Client.create(row);
          }
          fs.unlinkSync(req.file.path);
          res.status(200).json({ message: '客户导入成功' });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      });
  });

  // 可以为其他实体（合同、员工、财务文档）添加类似的导入路由

  return router;
};