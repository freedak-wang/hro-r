const express = require('express');
const router = express.Router();
const Reconciliation = require('../models/Reconciliation');

// Get all reconciliations
router.get('/', async (req, res) => {
  try {
    const reconciliations = await Reconciliation.find().populate('client').populate('details.employee');
    res.json(reconciliations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new reconciliation
router.post('/', async (req, res) => {
  const reconciliation = new Reconciliation(req.body);
  try {
    const newReconciliation = await reconciliation.save();
    res.status(201).json(newReconciliation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a reconciliation
router.patch('/:id', async (req, res) => {
  try {
    const updatedReconciliation = await Reconciliation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedReconciliation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;