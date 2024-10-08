const express = require('express');

module.exports = (Employee) => {
  const router = express.Router();

  // 获取所有员工
  router.get('/', async (req, res) => {
    try {
      const employees = await Employee.findAll();
      res.json(employees);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // 创建新员工
  router.post('/', async (req, res) => {
    try {
      const newEmployee = await Employee.create(req.body);
      res.status(201).json(newEmployee);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // 其他 CRUD 操作可以根据需要添加

  return router;
};