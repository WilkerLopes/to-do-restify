import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: "date",
    default: () => new Date(),
  },
});

export const Todo = mongoose.model("todos", TodoSchema);
