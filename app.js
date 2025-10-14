import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import session from "express-session";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import methodOverride from "method-override";
import authMiddleware from './middlewares/authMiddleware.js';
import { indexRoute, authRoute, userRoute, orderRoute, addressRoute } from './routes/index.js';

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
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use((req, res, next) => {
    res.locals.errors = req.session.errors || {};
    res.locals.successes = req.session.successes || {};
    delete req.session.errors;
    delete req.session.successes;
    next();
});

// Middelware
app.use(authMiddleware);

// Register routes
app.use('/', indexRoute);
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/order', orderRoute);
app.use('/address', addressRoute);

// Start server
(async () => {
  try {
    await connectDB();
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
