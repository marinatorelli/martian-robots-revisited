// Get problem input in form of array, with each position being one line from the input string

function checkInput() {


    // Check map coordinates are at max 50
    if (map_x > 50 || map_y > 50 || map_x < 0 || map_y < 0){
        console.error("Error with input: The maximum value for any coordinate is 50 and the minimum is 0")
        return false
    }

    for (var i = 0; i < num_robots; ++i) {

        // Check that robots spawn within the grid
        if (robots[i].init_x > map_x | robots[i].init_x < 0 | robots[i].init_y > map_y | robots[i].init_y < 0){
            console.error("Error with input: The robots must spawn within the map grid.")
            return false
        }
     

        // Check that the maximum number of instructions given to any robots is less 100
        if(input_by_line[i+i+2].length > 99){
            console.error("Error with input: A robot can only take less than 100 instructions.")
            return false
        }

        // Check that the instructions given to the robots are valid
        for (ii=0; ii < input_by_line[i+i+2].length; ++ii){
            for(j=0; j < num_accepted_commands; ++j){
              if(!accepted_commands.includes(input_by_line[i+i+2][ii])){
                console.error(`Error with input: The command "${input_by_line[i+i+2][ii]}" is not a valid instruction.`)
                return false
              }
            }
        }

    }
    return true
}

exports.checkInput = checkInput