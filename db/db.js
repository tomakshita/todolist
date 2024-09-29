const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(
      "mongodb+srv://akshitatom:hlZLIRT6rBskTM4L@cluster0.yu4f7.mongodb.net/?retryWrites=true&w=majority&appName=todolist"
    );
    console.log("connection successful");
  } catch (error) {
    console.log(error, "error in connection");
  }
}

module.exports = {
  connectDb,
};
