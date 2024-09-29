const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    todoName: String,
    todostatus: Boolean,
  },
  { timestamps: true }
);

const TodoSchema = mongoose.model("TodoSchema", todoSchema);

module.exports = {
  TodoSchema,
};
