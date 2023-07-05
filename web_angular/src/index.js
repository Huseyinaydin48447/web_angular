const express = require("express");
const server = express();
const routes = require("./routes/routes");
const cors = require("cors");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dbcustomer', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

server.use(cors());

server.use(express.json());
server.use(routes);

server.listen(8000, (error) => {
  if (error) {
    console.log("errorr");
  } else {
    console.log("startedddddd");
  }
});
