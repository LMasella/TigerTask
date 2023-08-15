import mongoose from 'mongoose';

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Must include title.']
    },
    information: {
        type: String,
        required: [true, 'Must include information.']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Must assign category.']
    },
    dueDate: {
        type: Date,
        required: [true, 'Must assign due date.']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    completed: {
        type: Boolean
    }
}, {
    timestamps: true
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;