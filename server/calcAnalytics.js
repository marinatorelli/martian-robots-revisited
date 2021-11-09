// Define and load the database for the persistance layer
const Datastore = require('nedb');
const database = new Datastore("database.db");
database.loadDatabase();

// Function that calculates insights regarding the surface of the planet
function calcSurface() {

    // Calculate the amount of surface grid squares each robot has explored
    for (var i=0; i<num_robots; i++){
        explored_surface_by_robot[i] = 0
        for (var ii=0; ii<map_y+1; ++ii){
            for (var jj=0; jj<map_x+1; ++jj){
                if (grid_map[ii][jj][`explored_by_robot_${i}`] == 1){
                    explored_surface_by_robot[i] += 1; 
                }
            }
        }
    }
    // Calculate the total surface grid squares explored by all robots
    explored_surface = 0
    for (var ii=0; ii<map_y+1; ++ii){
        for (var jj=0; jj<map_x+1; ++jj){
            if(grid_map[ii][jj].visited == 1){
                explored_surface +=1;
            }
        }
    }
    // Calculate the percentage of the planet's surface that has been explored
    perc_explored_surface = explored_surface/grid_squares
}

// Store in the database the insights calculated from all the expeditions
function calcInsights(){

    // Get the amount of recorded expeditions in the database
    counter = 1
    database.count({reference: "expedition"}, (err, count) => {
        counter = count;
    });

    database.find({ reference: "expedition" }, (err, data) => {

        analytics_num_robots = 0
        analytics_num_lost_robots = 0
        analytics_surface_of_mars = 0
        analytics_explored_surface = 0

        // Sum the values of all expeditions in order to calculate global data
        for (item of data) {
            analytics_num_robots += item.number_of_robots
            analytics_num_lost_robots += item.number_of_lost_robots
            analytics_surface_of_mars += item.surface_of_mars
            analytics_explored_surface += item.explored_surface
        }

        // Calculate global data (averages and percentages)
        analytics_avg_num_robots = analytics_num_robots/counter
        analytics_avg_num_lost_robots = analytics_num_lost_robots/counter
        analytics_avg_surface_of_mars = analytics_surface_of_mars/counter
        analytics_avg_explored_surface = analytics_explored_surface/counter
        analytics_pct_lost_robots = (analytics_num_lost_robots/analytics_num_robots)*100
        analytics_pct_explored_surface = (analytics_explored_surface/analytics_surface_of_mars)*100
  
        // Create a document with the insights info
        insights = {
            reference: "insights",
            timestamp: Date.now(),

            ins_number_of_robots: analytics_num_robots,
            ins_average_number_of_robots: analytics_avg_num_robots,
            ins_number_of_lost_robots: analytics_num_lost_robots,
            ins_average_number_of_lost_robots: analytics_avg_num_lost_robots,

            ins_surface_of_mars_total: analytics_surface_of_mars,
            ins_average_surface_of_mars: analytics_avg_surface_of_mars,
            ins_explored_surface: analytics_explored_surface,
            ins_average_explored_surface: analytics_avg_explored_surface,

            ins_percetage_of_robots_lost: analytics_pct_lost_robots,
            ins_percentage_of_surface_explored: analytics_pct_explored_surface
        }
        
        // Store the document into the database
        database.insert(insights);
    });
}

//export functions
exports.calcSurface = calcSurface
exports.calcInsights = calcInsights
