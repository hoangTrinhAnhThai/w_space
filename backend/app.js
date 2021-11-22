const express = require('express')
const path = require('path')
const cors = require('cors')
const route = require('./src/routes/index.js')
const db = require('./src/config/database')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)
require('dotenv').config()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
route(app)
db.connect()

io.on('connection', (socket) => {
    console.log('connect');
})

var server_port = process.env.PORT || 80;
var server_host = process.env.HOST || '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log(`Listening on port http://${server_host}:${server_port}`);
});