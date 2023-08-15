import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    information: {
        type: String,
        required: true
    },
    todos: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Todo',
    }
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

export default Category;