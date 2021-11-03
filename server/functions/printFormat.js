
// get input in the correct format and print in on the screen
function printInput() {
  init_robots = "INPUT: \n" + input + "\n"
  console.log(init_robots)
}

// get output of the problem with the correct format and print it on the screen
function printOutput(){
    final_robots = "OUTPUT:";
    for (var i = 0; i < num_robots; ++i){
      var out_x = robots[i].curr_x;
      var out_y = robots[i].curr_y;
      var out_orientation = robots[i].curr_orientation;
      if(robots[i].outOfBounds == true){
        var out_bounds = "LOST";
      }
      else{
        var out_bounds = "";
      }
      var out_robot = "\n" + out_x + " " + out_y + " " + out_orientation + " " + out_bounds;
      final_robots += out_robot;
    }
    // show in the command line
    console.log(final_robots);
}

exports.printInput = printInput
exports.printOutput = printOutput

