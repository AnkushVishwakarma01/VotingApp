const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/routes');
// const pageContolRouter = require('./routes/pageControlRoutes');
// const path = require('path');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
require('dotenv').config();

// Static files
// app.use('/voting_app', express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));  

// Parse application/json
app.use(bodyParser.json());

app.use('/voting_app_backend', router);

// app.use('/voting_app', pageContolRouter);

async function start(){
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log('mongodb connected!');
        app.listen(PORT, console.log('server listen on port: '+PORT));
    }).catch(err => console.log(err))
}
start();
