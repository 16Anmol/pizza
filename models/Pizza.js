const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  customerName: String,
  pizzaName: String,
  size: String,
  crust: String,
  toppings: [String],
  quantity: Number,

  basePrice: Number,
  totalPrice: Number,
});

module.exports = mongoose.model("Pizza", pizzaSchema);
