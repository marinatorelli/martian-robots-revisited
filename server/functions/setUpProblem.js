/* PURPOSE OF THIS FILE */
// When the problem is initialized from the Command Window, it can be run entirely with CLI or it can run on the web server with a REST API
// This file will determine which it will be depending on the command line arguments

const fs = require('fs')
//const { Grid } = require('./initProblem')

// Get number of arguments from the command line
var args = process.argv

const setUp = () => {

    //const input = "";
    getInput();
    initProblem();
    createGrid();
    createRobots();
}

const getInput = () =>{
    // if the node app receives a txt file as a third argument, it takes the input from that file
    if (args.length == 3 ){
        console.log("Initializing problem on the command line")
        // Get the whole input string from the file
        input = fs.readFileSync(args[2], 'utf8')
        // Divide the string by lines
        input_by_line = input.split("\r\n")
        return input_by_line, input
    }
    else if (args.length == 2) {
        console.log("Initializing problem on the web server")
    }
    else {
        console.log("The number of arguments is wrong.")
        process.exit()
    }
}

// Define Grid object
function Grid() {
    this.visited = -1;
    this.scent = -1;
}

// Define Robot object
function Robot() {
    this.init_x = 0;
    this.init_y = 0;
    this.init_orientation = "";
    this.outOfBounds = false;
}

const initProblem = () => {

    // Define accepted commands for the robot instructions
    accepted_commands = ["L", "R", "F"];
    num_accepted_commands = accepted_commands.length;

    //number of lines of the input string
    len = input_by_line.length
    input_info = []

    // Get the individual values that are in each line
    for (i=0; i < len; i++){
        input_info[i] = input_by_line[i].split(" ")
    }
    
    map_x = parseInt(input_info[0][0])
    map_y = parseInt(input_info[0][1])
    
    num_robots = (len-1)/2;
    num_lost_robots = 0;
    grid_squares = (map_x+1)*(map_y+1);
    robots = new Array(num_robots);

    // variables for analytics
    paths_robots = new Array(num_robots);
    number_actions_per_robot = new Array(num_robots);
    explored_surface_by_robot = new Array(num_robots);
    explored_surface_by_robot_unique = new Array(num_robots);
    
    return input_info, accepted_commands, num_accepted_commands, map_x, map_y, num_robots, num_lost_robots, grid_squares,
    robots, paths_robots, number_actions_per_robot, explored_surface_by_robot, explored_surface_by_robot_unique
}

function createGrid() {
    grid_map = new Array(map_y+1)
    for (var i=0; i < map_y+1; ++i){
        grid_map[i] = new Array(map_x+1)
        for (var ii=0; ii<map_x+1; ++ii){
            grid_map[i][ii] = new Grid();
        }
    }
    return grid_map
}

function createRobots() {
    for (var i = 0; i < num_robots; ++i) {
      robots[i] = new Robot();

      //save initial position and orientation
      robots[i].init_x = parseInt(input_info[i+i+1][0]);
      robots[i].init_y = parseInt(input_info[i+i+1][1]);
      robots[i].init_orientation = input_info[i+i+1][2];

      //set current position as initial position
      robots[i].curr_x = robots[i].init_x;
      robots[i].curr_y = robots[i].init_y;
      robots[i].curr_orientation = robots[i].init_orientation;


    }
    return robots
}


exports.setUp = setUp
