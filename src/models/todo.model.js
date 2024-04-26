import mongoose, { Schema, model } from "mongoose";

const todoSchema = new Schema({
    id: {
        type: Number,
        required: [true, "Id is required"]
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
    },
    isImportant: {
        type: Boolean,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Todo = model("Todo", todoSchema);
export default Todo