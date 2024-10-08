const express = require('express');

module.exports = (Client) => {
  const router = express.Router();

  // 获取所有客户
  router.get('/', async (req, res) => {
    try {
      const clients = await Client.findAll();
      res.json(clients);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // 创建新客户
  router.post('/', async (req, res) => {
    try {
      const newClient = await Client.create(req.body);
      res.status(201).json(newClient);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // 其他 CRUD 操作可以根据需要添加

  return router;
};