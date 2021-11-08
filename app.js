const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

// Backend functions
const getInput = require('./backendFunctions/getInput')
const setUp = require('./backendFunctions/setUpProblem')
const checkInput = require('./backendFunctions/checkInput')
const robotMovement = require('./backendFunctions/robotMovement')
const printFormat = require('./backendFunctions/printFormat')
const calcAnalytics = require('./backendFunctions/calcAnalytics');
const storeExpedition = require('./backendFunctions/storeExpedition');


app.use('/client', express.static('client'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './client/views'));
app.use('/', require('./client/routes/appRoute'));
app.use(express.json());


// When the problem is initialized with the input coming from a txt file in the command line
if(getInput.getInput() == false){
    main();
}

// When the problem is initialized and the input must be retreived from the client side of the web server
app.post('/api', (request, response) => {

    const input_data = request.body;
    if (!input_data){
        response.status(418).send({ message: "We need an input!"})
    }
   
    input = input_data.input;
    input_by_line = input.split("\n")
    main();
    response.json({
        status: "success",
        input: input
    });

});



// main functionality of the problem
function main(){
    // Check the input is not empty
    if(checkInput.inputExists() == false){
        return
    }

    // Initialize the problem values
    setUp.setUp();

    // Check that the problem values are correct (e.g. there's no errors in the input)
    if(checkInput.checkInput() == false){
        return
    }

    // Perform the core functionality of the problem
    robotMovement.robotMovement();

    //Print on the console window the input and the output
    printFormat.printInput();
    printFormat.printOutput();

    // Calculate extra information about the problem
    calcAnalytics.calcSurface();

    // Store the expedition data into the database for persistance
    storeExpedition.storeExpedition();

    // Calculate insights from all the expeditions up until the current one
    calcAnalytics.calcInsights();
    
}

// Setting up the port
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});