require('dotenv').load();

const express = require('express');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use(express.static('build'));

require('./routes/highScores')(app);
require('./routes/saveResult')(app);

const listener = app.listen(process.env.PORT || 3000, process.env.IP || "localhost", function(){
    console.log("Server listening at", listener.address().address + ":" + listener.address().port);
});
