
      // mark the initial position of the robot on the grid as "explored"
      grid_map[robots[i].init_y][robots[i].init_x].visited = 1;

      //specify which robot has explored the position
      grid_map[robots[i].init_y][robots[i].init_x][`explored_by_robot_${i}`] = 1;