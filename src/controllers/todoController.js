import Todo from '../models/todo.model.js';
import { object, string } from 'yup';

let todoValidation = object({
    id: string().required(),
    title: string().required().min(2).max(50),
    description: string().nullable(),
    isImportant: string().required(),
    completed: string().required()
})

const createTodo = async (req, res) => {
    try {
        const isValid = todoValidation.validateSync(req.body)
        if (!isValid) {
            throw new Error("Invalid data");
        }
        const todo = new Todo({
            ...req.body,
            author: req.id
        })
        await todo.save()
        console.log(todo);
        return res.status(201).json({ message: "Todo created Successfully", todo })
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ author: req.id })
        return res.status(200).json({ todos })
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}

const editTodo = async (req, res) => {
    try {
        const isValid = todoValidation.validateSync(req.body)
        if (!isValid) {
            throw new Error("Invalid data");
        }
        const todo = await Todo.findOneAndUpdate({ id: req.body.id }, req.body)
        console.log(todo);
        return res.status(200).json({ message: "Todo updated Successfully", todo })
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ id: req.body.id })
        // console.log(req.body.id);
        return res.status(200).json({ message: "Todo deleted Successfully", todo })
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}

const markCompleted = async (req, res) => {
    try {
        console.log(req.body.id);
        const todo = await Todo.findOneAndUpdate({ id: req.body.id }, { completed: req.body.completeStatus })
        return (req.body.completeStatus == true)
            ? res.status(200).json({ message: "Todo marked as completed", todo })
            : res.status(200).json({ message: "Todo marked as incomplete", todo })
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}

const markAllAsCompleted = async (req, res) => {
    try {
        const todos = await Todo.updateMany({ author: req.id }, { completed: true })
        return res.status(200).json({ message: "All Todos marked as completed", todos })
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}

export { createTodo, getTodos, editTodo, deleteTodo, markCompleted, markAllAsCompleted }