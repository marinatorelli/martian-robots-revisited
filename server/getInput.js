// Needed to read files
const fs = require('fs')
const { Server } = require('http')

// Get number of arguments from the command line
var args = process.argv

const getInput = () =>{

    // If the node app receives a txt file as a third argument, it takes the input from that file
    if (args.length == 3 && args[2] == "input.txt"){

        // Show the user that the data is coming
        console.log("Initializing problem on the command line, getting input from " + args[2])

        // Get the whole input string from the file
        input = fs.readFileSync(args[2], 'utf8')

        // Divide the string by lines
        input_by_line = input.split("\r\n")

        // Used for differentiating where the input comes from for the app.js file
        return false
    }

    else if (args.length == 2) {

        // Show the user that the data is coming
        console.log("Initializing problem on the web server")
        
        // Used for differentiating where the input comes from for the app.js file
        return true
    }

    else {
        console.log("The arguments are wrong.")
        process.exit()
    }
    
}

// Export function
exports.getInput = getInput
