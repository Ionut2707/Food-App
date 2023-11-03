const mongoose = require("mongoose");

const { Schema } = mongoose;

const FoodSchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  options: [
    {
      price: {
        half: { type: Number, required: true },
        full: { type: Number, required: true },
      },
    },
    ],
    description: {
        type: String,
        required: true,
  }
});


module.exports = mongoose.model("food",FoodSchema)
