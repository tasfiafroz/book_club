// routes/plantRoutes.js
const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant');

// Fetch all plants
router.get('/', async (req, res) => {
  try {
    const plants = await Plant.find().sort('order');
    res.json(plants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update plant order
router.put('/', async (req, res) => {
  const { plants } = req.body;
  try {
    await Promise.all(
      plants.map(async (plant) => {
        await Plant.findByIdAndUpdate(plant._id, { order: plant.order });
      })
    );
    res.json({ message: 'Order updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new plant
router.post('/', async (req, res) => {
  const { name, description, imageUrl } = req.body;

  try {
    const lastPlant = await Plant.findOne().sort('-order');
    const newOrder = lastPlant ? lastPlant.order + 1 : 1;

    const newPlant = new Plant({
      name,
      order: newOrder,
      description,
      imageUrl,
    });

    await newPlant.save();
    res.status(201).json(newPlant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a plant
router.delete('/:id', async (req, res) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.json({ message: 'Plant deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;