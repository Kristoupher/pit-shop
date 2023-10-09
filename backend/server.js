import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/UploadRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import {admin, protect} from "./middleware/authMiddleware.js";
const port = process.env.PORT || 5000;

connectDB(); // Connexion à MongoDB

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

app.use(cors(corsOptions));


// Routes

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/contact', contactRoutes);

app.get('/api/config/paypal', (req, res) => {
    res.send({clientId: process.env.PAYPAL_CLIENT_ID});
});

const __dirname = path.resolve(); // --dirname Est le dossier courant
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))); // Dossier static pour les uploads

if (process.env.NODE_ENV === 'production') {
    //Dossier static
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    //Chaque route qui n'existe pas redirige vers index.html
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});