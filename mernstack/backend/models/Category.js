const mongoose = require("mongoose");

const { Schema } = mongoose;

const FoodCategory = new Schema({
    categoryName: {
        type: String,
        required:true,
    }
})

module.exports = mongoose.model("foodCategory",FoodCategory)