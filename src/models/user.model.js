import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    todos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Todo'
        }
    ]
})

const User = model("User", userSchema);
export default User