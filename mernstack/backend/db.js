const mongoose = require("mongoose");
const fs = require("fs");
const food = require("../backend/models/Food");
const data = require("./populate/products.json");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// food
//   .insertMany(data)
//   .then(() => {
//     console.log("Data imported successfully!");
//   })
//   .catch((err) => {
//     console.error(err);
//   });


module.exports = connectDB;
