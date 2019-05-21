const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/TripsterLifeTEST', { useNewUrlParser: true });
} else {
  mongoose.connect('mongodb://localhost/TripsterLife', { useNewUrlParser: true });
}

const app = express();
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'));
app.use("*", function(req, res) {
  console.log(path.join(__dirname, "../client/build/index.html"));
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


module.exports = app;
