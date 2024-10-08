const express = require('express');

module.exports = (FinancialDocument) => {
  const router = express.Router();

  // 获取所有财务文档
  router.get('/', async (req, res) => {
    try {
      const documents = await FinancialDocument.findAll();
      res.json(documents);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // 创建新财务文档
  router.post('/', async (req, res) => {
    try {
      const newDocument = await FinancialDocument.create(req.body);
      res.status(201).json(newDocument);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // 其他 CRUD 操作可以根据需要添加

  return router;
};