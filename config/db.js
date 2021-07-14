const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

// We will refactor this:
// const connectDB = () => {
//   mongoose
//     .connect(db, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     })
//     .then(() => {
//       console.log("MongoDB connected");
//     })
//     .catch((err) => {
//       console.error(err.message);
//       process.exit(1);
//     });
// };

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
