const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(url).then(() => {
      console.log("connected to mongodb");
    });
  } catch (error) {
    console.log(`can't connect to mongodb, error: ${error}`);
  }
};

module.exports = connectToDatabase;
