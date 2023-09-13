import asyncHandler from 'express-async-handler';
import Todo from '../models/todoModel.js';

// @desc    Create new todo
// route    POST /api/todos
// @access  Private
const createTodo = asyncHandler(async (req, res) => {
    const { title, information, category, dueDate, createdBy, assignedTo } = req.body;

    const newTodo = await Todo.create({
        title,
        information,
        category,
        dueDate,
        createdBy,
        assignedTo,
        completed: false
    });

    if (newTodo) {
        res.status(201).json(newTodo);
    } else {
        res.status(400);
        throw new Error('Invalid todo data');
    }
});

// @desc    Get all todos
// route    GET /api/todos
// @access  Private
const getAllTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find();
    if (todos) {
        res.status(201).json(todos);
    } else {
        res.status(500);
        throw new Error("Couldn't load todos");
    }
});

// @desc    Get todos by category
// route    GET /api/todos/category/:categoryId
// @access  Private
const getTodosByCategory = asyncHandler(async (req, res) => {
    const todos = await Todo.find({category: req.params.categoryId}).populate('createdBy', 'name email').populate('assignedTo', 'name email').exec();
    if (todos) {
        res.status(201).json(todos);
    } else {
        res.status(500);
        throw new Error("Couldn't load todos");
    }
});

// @desc    Get todos by creator
// route    GET /api/todos/createdby/:userId
// @access  Private
const getTodosByCreator = asyncHandler(async (req, res) => {
    const todos = await Todo.find({createdBy: req.params.userId}).populate('createdBy', 'name email').populate('assignedTo', 'name email').exec();
    if (todos) {
        res.status(201).json(todos);
    } else {
        res.status(500);
        throw new Error("Couldn't load todos");
    }
});

// @desc    Get todos by assignee
// route    GET /api/todos/assignedto/:userId
// @access  Private
const getTodosByAssignee = asyncHandler(async (req, res) => {
    const todos = await Todo.find({assignedTo: req.params.userId}).populate('createdBy', 'name email').populate('assignedTo', 'name email').exec();
    if (todos) {
        res.status(201).json(todos);
    } else {
        res.status(500);
        throw new Error("Couldn't load todos");
    }
});

// @desc    Get todo by id
// route    GET /api/todos/:id
// @access  Private
const getTodoById = asyncHandler(async (req, res) => {
    let todo = await Todo.findOne({_id: req.params.id}).populate('createdBy', 'name email').populate('category', 'name').populate('assignedTo', 'name email').exec();
    if (todo) {
        res.status(201).json(todo);
    } else {
        res.status(400);
        throw new Error("Invalid todo id");
    }
});

// @desc    Update todo
// route    PUT /api/todos/:id
// @access  Private
const updateTodoById = asyncHandler(async (req, res) => {
    const todo = await Todo.findById({_id: req.params.id});
    if (todo) {
        todo.title = req.body.title || todo.title;
        todo.information = req.body.information || todo.information;
        todo.category = req.body.category || todo.category;
        todo.dueDate = req.body.dueDate || todo.dueDate;
        todo.assignedTo = req.body.assignedTo || todo.assignedTo;
        if (req.body.hasOwnProperty('completed')) {
            todo.completed = req.body.completed;
        }

        const updatedTodo = await todo.save();

        res.status(200).json(updatedTodo);
    } else {
        res.status(404);
        throw new Error('Todo not found');
    }
});

// @desc    Delete todo
// route    DELETE /api/todos/:id
// @access  Private
const deleteTodoById = asyncHandler(async (req, res) => {
    const todo = await Todo.findById({_id: req.params.id});
    if (!todo) {
        res.status(404);
        throw new Error('Todo not found');
    }
    if (todo.createdBy._id == req.body.creatorId) { //probably change this to verify jwt
        await Todo.deleteOne({_id: req.params.id});
        res.status(200).json(todo);
    } else {
        res.status(404);
        throw new Error('Must be creator to delete Todo');
    }
});

export {
    createTodo,
    getAllTodos,
    getTodoById,
    getTodosByCategory,
    getTodosByCreator,
    getTodosByAssignee,
    updateTodoById,
    deleteTodoById
};