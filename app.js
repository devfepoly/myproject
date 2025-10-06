import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';

import homeRouter from './routes/home.js';

// Load environment variables from .env file
dotenv.config();

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware setup
app.use(logger('dev')); // HTTP request logger
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Register routes
app.use('/', homeRouter);

// Start server
(async () => {
  try {
    app.listen(process.env.PORT, process.env.HOST_NAME, () => {
      console.log(
        `Server is running at http://${process.env.HOST_NAME}:${process.env.PORT}`
      );
    });
  } catch (error) {
    console.error('Server failed to start:', error);
  }
})();

export default app;
