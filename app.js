import createError from 'http-errors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import productsRouter from './routes/products.js';
import categoriesRouter from './routes/categories.js';
import ordersRouter from './routes/orders.js';
import orderDetailsRouter from './routes/orderDetails.js';
import apiRouter from './routes/api.js';
import connection from './config/database.js';
import webRouter from './routes/web.js';
import addressRouter from './routes/address.js';
import addressModel from './models/address.js';
import productModel from './models/Product.js';




//Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/orders', ordersRouter);
app.use('/orderDetails', orderDetailsRouter);
app.use('/api', apiRouter);
app.use('/web', webRouter);
app.use('/address', addressRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});



(async () => {
  try {
    await connection();
    app.listen(process.env.PORT, process.env.HOST_NAME, () => {
      console.log(`Server is running at http://${process.env.HOST_NAME}:${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
