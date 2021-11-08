
// Get input with the correct format and print it
function printInput() {

  // Get the correct format
  init_robots = "INPUT: \n" + input + "\n"

  // Show in the command window
  console.log(init_robots)
}

// Get output of the problem with the correct format and print it 
function printOutput(){

  // Start string
  final_robots = "OUTPUT:";

  // Get the final position values of all robots
  for (var i = 0; i < num_robots; ++i){
    var out_x = robots[i].curr_x;
    var out_y = robots[i].curr_y;
    var out_orientation = robots[i].curr_orientation;

    // Print LOST if the robot fell off the map 
    if(robots[i].outOfBounds == true){
      var out_bounds = "LOST";
    }

    // Print nothing otherwise
    else{
      var out_bounds = "";
    }

    // Get string with all the robot info
    var out_robot = "\n" + out_x + " " + out_y + " " + out_orientation + " " + out_bounds;

    // Append it to the initial string
    final_robots += out_robot;
  }

  // Show in the command window
  console.log(final_robots);
}

function printExpedition() {
  console.log(expedition)
}

function printInsights() {

}

// Export functions
exports.printInput = printInput
exports.printOutput = printOutput
exports.printExpedition = printExpedition
exports.printInsights = printInsights

