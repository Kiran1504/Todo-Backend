import { Router } from "express";
import { register, login, getCurrentUser, logout } from "../controllers/userController.js";
import { createTodo, deleteTodo, editTodo, getTodos, markAllAsCompleted, markCompleted } from "../controllers/todoController.js"
const userRouter = Router();
import jwt from 'jsonwebtoken';

//middleware starts

const middleware = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        console.log(token);
        if (!token) {
            throw new Error("Token not found");
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(decoded);
        req.id = decoded.id;
        // console.log(req.user);
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message })
    }
}

//middleware ends

userRouter.post("/users/signup", register);
userRouter.post("/users/signin", login);
userRouter.get("/users/verify", middleware, getCurrentUser)
userRouter.get("/users/logout", logout)


userRouter.post("/todos/create", middleware, createTodo)
userRouter.get("/todos/all", middleware, getTodos)
userRouter.put("/todos/edit", middleware, editTodo)
userRouter.delete("/todos/delete", middleware, deleteTodo)
userRouter.put("/todos/togglecomplete", middleware, markCompleted)
userRouter.put("/todos/completeall", middleware, markAllAsCompleted)


export { userRouter };