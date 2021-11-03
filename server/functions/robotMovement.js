// Function that checks whether the new robots position will be within the map grid
function outMapGrid(i) {

        // check if no previous robot has fallen off the planet from that position
        if(grid_map[robot.curr_y][robot.curr_x].scent == -1){
          // mark this position with the id of the robot that's fallen from it
          grid_map[robot.curr_y][robot.curr_x].scent = i;
          // set the robot as lost
          robot.outOfBounds = true;
          //  update the number of lost robots
          num_lost_robots += 1;
        }

        return robot, grid_map, num_lost_robots

        // if the robot would fall from the current position but another robot has previously fallen from it,
        // just do nothing and go to the next instructio
        
}
//Function that updates the positions of robots that are still within the map grid
    // the position is marked as visited
    // it specifies which robot has visited that grid square
    // it updates the path of that particular robot
function updatePosition() {
    robot.curr_x = new_x;
    robot.curr_y = new_y;
    robot.curr_orientation = new_orientation;

    return robot
}

function updateMapGrid(i) {
    //mark the position as visited
    grid_map[robot.curr_y][robot.curr_x].visited = 1;

    // mark the position as visited with the robot id
    grid_map[robot.curr_y][robot.curr_x][`explored_by_robot_${i}`] = 1;

    return grid_map
}

// Main movement function 

function robotMovement() {
    //calculate the momevents for each robots individually, one after the other
    for (var i = 0; i < num_robots; ++i){
        robot = robots[i]
        updateMapGrid(i);
        paths_robots[i] = [] 
        // iterates through the instruction line
        Array.from(input_by_line[i+i+2]).forEach(element => {

            // checks that the robot is still within the map grid
            if(robot.outOfBounds == false){

                // "L" -> the robot stays on the same grid point and turns 90 degrees to the left
                if (element == "L"){
                    switch (robot.curr_orientation) {
                        case "N":
                            new_orientation = "W";
                            break;
                        case "E":
                            new_orientation = "N";
                            break;
                        case "S":
                            new_orientation = "E";
                            break;
                        case "W":
                            new_orientation = "S";
                        break;
                        }
                    robot.curr_orientation = new_orientation;
                    paths_robots[i].push([robot.curr_x, robot.curr_y, robot.curr_orientation]);
                }

                // "R" -> the robot stays on the same grid point and turns 90 degrees to the right
                if (element == "R"){
                    switch (robot.curr_orientation) {
                        case "N":
                            new_orientation = "E";
                            break;
                        case "E":
                            new_orientation = "S";
                            break;
                        case "S":
                            new_orientation = "W";
                            break;
                        case "W":
                            new_orientation = "N";
                            break;
                        }
                    robot.curr_orientation = new_orientation;
                    paths_robots[i].push([robot.curr_x, robot.curr_y, robot.curr_orientation]);
                }

                // "F" -> the robot moves forward one grid point in the current orientation and maintains the same orientation
                if (element == "F"){
                    switch (robot.curr_orientation) {
                        case "N":
                            //calculate the new position
                            new_x = robot.curr_x;
                            new_y = robot.curr_y +1;
                            new_orientation = "N";
                            if (new_x > map_x | new_y > map_y | new_x < 0 | new_y < 0){
                                outMapGrid(i);
                                break;
                            }
                            updatePosition();
                            updateMapGrid(i);
                            // update the path of the robot
                            paths_robots[i].push([robot.curr_x, robot.curr_y, robot.curr_orientation]);
                            break;

                        case "E":
                            //calculate the new position
                            new_x = robot.curr_x+1;
                            new_y = robot.curr_y;
                            new_orientation = "E";
                            if (new_x > map_x | new_y > map_y | new_x < 0 | new_y < 0){
                                outMapGrid(i);
                                break;
                            }
                            updatePosition();
                            updateMapGrid(i);                            // update the path of the robot
                            paths_robots[i].push([robot.curr_x, robot.curr_y, robot.curr_orientation]);
                            break;

                        case "S":
                            //calculate the new position
                            new_x = robot.curr_x;
                            new_y = robot.curr_y-1;
                            new_orientation = "S";
                            if (new_x > map_x | new_y > map_y | new_x < 0 | new_y < 0){
                                outMapGrid(i);
                                break;
                            }
                            updatePosition();
                            updateMapGrid(i);                            // update the path of the robot
                            paths_robots[i].push([robot.curr_x, robot.curr_y, robot.curr_orientation]);
                            break;
                        
                        case "W":
                            //calculate the new position
                            new_x = robot.curr_x-1;
                            new_y = robot.curr_y;
                            new_orientation = "W";
                            if (new_x > map_x | new_y > map_y | new_x < 0 | new_y < 0){
                                outMapGrid(i);
                                break;
                            }
                            updatePosition();
                            updateMapGrid(i);                            // update the path of the robot
                            paths_robots[i].push([robots[i].curr_x, robots[i].curr_y, robots[i].curr_orientation]);
                            break;
                        
                    }
                    
                }
            }
        });
        // add the initial position of the robot to its path
        paths_robots[i].unshift([robot.init_x, robot.init_y, robot.init_orientation]);
        robots[i] = robot
    }
    //console.log(robots)
    return robots

}

exports.robotMovement = robotMovement;