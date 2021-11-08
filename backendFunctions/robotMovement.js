// Function that checks whether the new robots position will be within the map grid
function offMapGrid(i) {

        // check if no previous robot has fallen off the planet from that position
        if(grid_map[robot.curr_y][robot.curr_x].scent == -1){

          // mark this position with the id of the robot that's fallen from it
          grid_map[robot.curr_y][robot.curr_x].scent = i;

          // set the robot as lost
          robot.outOfBounds = true;

          //  update the number of lost robots
          num_lost_robots += 1;

        }

        /*
        Otherwise, if the robot is set to fall from the current position but another robot has previously fallen from it,
        just do nothing, ignore the instruction and go to the next one  
        */
       
}

// Function that updates the positions of robots that are still within the map grid
function updatePosition() {
    robot.curr_x = new_x;
    robot.curr_y = new_y;
    robot.curr_orientation = new_orientation;
}

// Function that updates the values of the map grid (visited squares)
function updateMapGrid(i) {

    // mark the position as visited
    grid_map[robot.curr_y][robot.curr_x].visited = 1;

    // mark the position as visited with the robot id
    grid_map[robot.curr_y][robot.curr_x][`explored_by_robot_${i}`] = 1;

}

// Main movement function 
function robotMovement() {

    //calculate the movements for each robot, one after the other
    for (var i = 0; i < num_robots; ++i){
        robot = robots[i]
        
        // Call updateMapGrid() function in order to set the robot's initial position as visited
        updateMapGrid(i);

        // Initialise the arrays 
        paths_robots[i] = [] 
        number_actions_per_robot[i] = 0

        // Iterate through the line of instructions
        Array.from(input_by_line[i+i+2]).forEach(element => {

            // check that the robot is still within the map grid
            if(robot.outOfBounds == false){

                // Update the number of actions performed by the robot
                number_actions_per_robot[i] +=1

                // "L" -> the robot stays on the same grid point and turns 90 degrees to the left
                if (element == "L"){

                    // Perform the instruction, depending on the robot's current orientation
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
                    
                    // Update position values
                    robot.curr_orientation = new_orientation;

                    // Update the robot's path
                    paths_robots[i].push([robot.curr_x, robot.curr_y, robot.curr_orientation]);
                }

                // "R" -> the robot stays on the same grid point and turns 90 degrees to the right
                if (element == "R"){

                    // Perform the instruction, depending on the robot's current orientation
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

                    // Update position values
                    robot.curr_orientation = new_orientation;

                    // Update the robot's path
                    paths_robots[i].push([robot.curr_x, robot.curr_y, robot.curr_orientation]);
                }

                // "F" -> the robot moves forward one grid point in the current orientation and maintains the same orientation
                if (element == "F"){

                    // Perform the instruction, depending on the robot's current orientation
                    switch (robot.curr_orientation) {

                        case "N":
                            // calculate the new position
                            new_x = robot.curr_x;
                            new_y = robot.curr_y +1;
                            new_orientation = "N";

                            // check whether the new position would be inside the map limits
                            if (new_x > map_x | new_y > map_y | new_x < 0 | new_y < 0){
                                // if the robot is about to fall
                                offMapGrid(i);
                                break;
                            }

                            /* if the robot does not fall off the map: */
                            updatePosition();   // update the robot's position
                            updateMapGrid(i);   // update the grid values (newly visited square)

                            // update the robot's path
                            paths_robots[i].push([robot.curr_x, robot.curr_y, robot.curr_orientation]);
                            break;

                        case "E":
                            // calculate the new position
                            new_x = robot.curr_x+1;
                            new_y = robot.curr_y;
                            new_orientation = "E";

                            // check whether the new position would be inside the map limits
                            if (new_x > map_x | new_y > map_y | new_x < 0 | new_y < 0){
                                // if the robot is about to fall
                                offMapGrid(i);
                                break;
                            }

                            /* if the robot does not fall off the map: */
                            updatePosition();   // update the robot's position
                            updateMapGrid(i);   // update the grid values (newly visited square)

                            // update the robot's path                       
                            paths_robots[i].push([robot.curr_x, robot.curr_y, robot.curr_orientation]);
                            break;

                        case "S":
                            // calculate the new position
                            new_x = robot.curr_x;
                            new_y = robot.curr_y-1;
                            new_orientation = "S";

                            // check whether the new position would be inside the map limits
                            if (new_x > map_x | new_y > map_y | new_x < 0 | new_y < 0){
                                // if the robot is about to fall
                                offMapGrid(i);
                                break;
                            }

                            /* if the robot does not fall off the map: */
                            updatePosition();   // update the robot's position
                            updateMapGrid(i);   // update the grid values (newly visited square)          

                            // update the robot's path
                            paths_robots[i].push([robot.curr_x, robot.curr_y, robot.curr_orientation]);
                            break;
                        
                        case "W":
                            // calculate the new position
                            new_x = robot.curr_x-1;
                            new_y = robot.curr_y;
                            new_orientation = "W";

                            // check whether the new position would be inside the map limits
                            if (new_x > map_x | new_y > map_y | new_x < 0 | new_y < 0){
                                // if the robot is about to fall
                                offMapGrid(i);
                                break;
                            }

                            /* if the robot does not fall off the map: */
                            updatePosition();   // update the robot's position
                            updateMapGrid(i);   // update the grid values (newly visited square)  

                            // update the robot's path
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

    return robots

}

// Export main movement function
exports.robotMovement = robotMovement;