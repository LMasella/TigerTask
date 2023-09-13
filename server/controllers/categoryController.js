import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';
import Todo from '../models/todoModel.js';

// @desc    Create new category
// route    POST /api/categories
// @access  Private
const createCategory = asyncHandler(async (req, res) => {
    const { name, information } = req.body;
    
    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
        res.status(400);
        throw new Error('Category already exists');
    }

    const newCategory = await Category.create({
        name,
        information
    });

    if (newCategory) {
        res.status(201).json({
            _id: newCategory._id,
            name: newCategory.name,
            information: newCategory.information
        });
    } else {
        res.status(400);
        throw new Error('Invalid category data');
    }
});

// @desc    Get all categories
// route    GET /api/categories
// @access  Private
const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    if (categories) {
        res.status(201).json(categories);
    } else {
        res.status(500);
        throw new Error("Couldn't load categories");
    }
});

// @desc    Update category
// route    PUT /api/categories/:id
// @access  Private
const updateCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findById({_id: req.params.id});
    if (category) {
        category.title = req.body.title || category.title;
        category.information = req.body.information || category.information;

        const updatedCategory = await category.save();

        res.status(200).json(updatedCategory)
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
    res.status(200).json({message: 'Updated category'});
});

// @desc    Delete category
// route    DELETE /api/categories/:id
// @access  Private
const deleteCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findById({_id: req.params.id});
    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }
    const todos = await Todo.find({category: req.params.id});
    if (todos.length === 0) {
        await Category.deleteOne({_id: req.params.id});
        res.status(200).json(category);
    } else {
        res.status(404);
        throw new Error('Category must be empty to delete');
    }
});

export {
    createCategory,
    getAllCategories,
    updateCategoryById,
    deleteCategoryById
};