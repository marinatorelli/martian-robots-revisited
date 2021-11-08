// Define and load the database for the persistance layer
const Datastore = require('nedb');
const database = new Datastore("database.db");
database.loadDatabase();

// Main setUp function
const setUp = () => {
    initProblem();
    createGrid();
    createRobots();
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

// Function that initialises most of the values and arrays that will be used to perform the problem
const initProblem = () => {

    // define the accepted commands for the robot instructions
    accepted_commands = ["L", "R", "F"];
    num_accepted_commands = accepted_commands.length;

    // get the number of lines of the input string
    len = input_by_line.length
    input_info = []

    // get the individual values for each line
    for (i=0; i < len; i++){
        input_info[i] = input_by_line[i].split(" ")
    }
    
    // set map coordinates
    map_x = parseInt(input_info[0][0])
    map_y = parseInt(input_info[0][1])
    
    // variables needed for the execution of the problem
    num_robots = (len-1)/2;
    num_lost_robots = 0;
    explored_surface = 0;
    grid_squares = (map_x+1)*(map_y+1);
    robots = new Array(num_robots);

    // variables needed for the calculation of data insights
    paths_robots = new Array(num_robots);
    number_actions_per_robot = new Array(num_robots);
    explored_surface_by_robot = new Array(num_robots);
   
}

// Function that creates the map grid
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

// Function that creates all robot objects and sets their initial position and orientation
function createRobots() {

    // for each robot
    for (var i = 0; i < num_robots; ++i) {
    
        // create a robot object inside the array of robots
        robots[i] = new Robot();

        // save initial position and orientation
        robots[i].init_x = parseInt(input_info[i+i+1][0]);
        robots[i].init_y = parseInt(input_info[i+i+1][1]);
        robots[i].init_orientation = input_info[i+i+1][2];

        // set current position as initial position
        robots[i].curr_x = robots[i].init_x;
        robots[i].curr_y = robots[i].init_y;
        robots[i].curr_orientation = robots[i].init_orientation;

    }

    return robots
}

// Export main setUp function
exports.setUp = setUp
