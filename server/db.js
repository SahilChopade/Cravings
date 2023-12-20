const mongoose = require("mongoose");
const connectDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("MongoDB Connected!!");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
module.exports = { connectDB };
