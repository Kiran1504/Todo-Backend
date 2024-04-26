import { Router } from "express";
import { register, login, getCurrentUser } from "../controllers/userController.js";
import { createTodo, deleteTodo, editTodo, getTodos } from "../controllers/todoController.js"
const userRouter = Router();
import jwt from 'jsonwebtoken';

//middleware starts

const middleware = (req, res, next) => {
    console.log("Middleware");
    try {
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        console.log(token);
        if (!token) {
            throw new Error("Token not found");
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded);
        req.id = decoded.id;
        console.log(req.user);
        next();
    } catch (error) {
        console.log(error);
    }
}

//middleware ends

userRouter.post("/users/signup", register);
userRouter.post("/users/signin", login);
userRouter.get("/users/verify", middleware, getCurrentUser)
userRouter.post("/todos/create", middleware, createTodo)
userRouter.get("/todos/all", middleware, getTodos)
userRouter.put("/todos/edit", middleware, editTodo)
userRouter.delete("/todos/delete", middleware, deleteTodo)


export { userRouter };