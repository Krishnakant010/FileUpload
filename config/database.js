const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("db connection established");
    })
    .catch((e) => {
      console.log(e.message);
      console.log("Error connecting to Mongo");
      process.exit(1);
    });
};
