const express = require('express')
const path = require('path')
const cors = require('cors')
const route = require('./src/routes/index.js')
const db = require('./src/config/database')
const app = express()
require('dotenv').config()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
cors(app)
route(app)
db.connect()

var server_port = process.env.PORT || 80;
var server_host = process.env.HOST || '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log(`Listening on port http://${server_host}:${server_port}`);
});