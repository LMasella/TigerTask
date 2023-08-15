import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import todoRoutes from './routes/todoRoutes.js';

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/todos', todoRoutes);

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
} else {
    app.get('/', (req, res) => res.send('Server is ready'));
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));