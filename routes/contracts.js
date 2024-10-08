const express = require('express');

module.exports = (Contract) => {
  const router = express.Router();

  // 获取所有合同
  router.get('/', async (req, res) => {
    try {
      const contracts = await Contract.findAll();
      res.json(contracts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // 创建新合同
  router.post('/', async (req, res) => {
    try {
      const newContract = await Contract.create(req.body);
      res.status(201).json(newContract);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // 其他 CRUD 操作可以根据需要添加

  return router;
};