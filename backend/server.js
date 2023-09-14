import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
const port = process.env.PORT || 5000;

connectDB(); // Connexion à MongoDB

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});