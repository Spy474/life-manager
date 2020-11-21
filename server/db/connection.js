const mongoose = require("mongoose");
const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://Admin:4MfdeS9hyXgbRxKL@data-cluster.amvhy.mongodb.net/life-manager?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    }
  );

  console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDB;
