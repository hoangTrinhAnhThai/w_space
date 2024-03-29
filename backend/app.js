const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const route = require('./src/routes/index.js')
const db = require('./src/config/database')
const app = express()
require('dotenv').config()

const methodOverride = require('method-override')

db.connect()

app.use(bodyParser.json())
app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const corsOptions = {
  origin: process.env.URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'],
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions))
route(app)
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server_port = process.env.PORT || 80;
const server_host = process.env.HOST || '0.0.0.0';
app.listen(server_port, server_host, function () {
  console.log(`Listening on port http://${server_host}:${server_port}`);
});