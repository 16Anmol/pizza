const express = require("express");

const router = express.Router();

const Pizza = require("../models/Pizza");

// CREATE
router.post("/", async (req, res) => {
  try {
    const pizza = await Pizza.create(req.body);

    res.json(pizza);
  } catch (err) {
    res.status(500).json(err);
  }
});

// READ
router.get("/", async (req, res) => {
  try {
    const pizzas = await Pizza.find();

    res.json(pizzas);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedPizza = await Pizza.findByIdAndUpdate(
      req.params.id,

      req.body,

      { new: true },
    );

    res.json(updatedPizza);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Pizza.findByIdAndDelete(req.params.id);

    res.json({
      message: "Pizza Deleted",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
