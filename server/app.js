const express = require('express');
const app = express();
const path = require('path');

require('dotenv').config();

// Backend functions
const setUp = require('./functions/setUpProblem')
const checkInput = require('./functions/checkInput')

app.use('/client', express.static('client'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client/views'));
app.use('/', require('../client/routes/appRoute'));

// main functionality
setUp.setUp();
checkInput.checkInput();

// Setting up the port
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});