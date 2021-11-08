// Define and load the database for the persistance layer
const Datastore = require('nedb');
const database = new Datastore("database.db");
database.loadDatabase();

// Store in the database the general data from the current expedition
function storeExpedition(){
  
    // create expedition document
    expedition = {
      reference: "expedition",
      timestamp: Date.now(),
      input: input,
      output: final_robots,
  
      number_of_robots : num_robots,
      number_of_lost_robots: num_lost_robots,
      paths_of_robots: paths_robots,
      number_of_actions_per_robot: number_actions_per_robot,
  
      surface_of_mars: grid_squares,
      explored_surface: explored_surface,
      percentage_explored_surface: perc_explored_surface,
      explored_surface_by_robot: explored_surface_by_robot,
    } 

    // store expedition info into the database
    database.insert(expedition);

}

// Export function
exports.storeExpedition = storeExpedition
