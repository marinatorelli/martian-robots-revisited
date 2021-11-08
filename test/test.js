const assert = require('chai').assert;
const app = require('../server/app')
const getInput = require('../server/functions/getInput')


describe('REST API', () => {

    describe("GET /homepage", () => {
    });

    describe("GET /expeditions", () => {
    });

    describe("GET /insights", () => {
    });

    /*
    describe("Error: GET /notapath", () => {
        it("It should NOT GET anything", (done) => {
            chai.request(app)
                .get("/notacall")
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });
    });
    */
});


describe('Get input', () => {
    
    describe("Getting input through command line", () => {
        it('should return input and input_by_line', function(){
            let result = getInput();
            assert.typeOf(result, 'string');
        })
    });


    describe("Getting input through the API", () => {
    });

    describe("Error: could not get input", () => {
    });

});


describe('Check the input', () => {

    describe("Error: Input is empty", () => {
    });

    describe("Error: Input format is incorrect", () => {
    });

    describe("Error:The maximum value for any coordinate is 50 and the minimum is 0", () => {
    });

    describe("Error: The robots must spawn within the map grid", () => {
    });

    describe("Error: A robot can only take less than 100 instructions", () => {
    });

    describe("Error: The command is not a valid instruction", () => {
    });
    
    describe("Success: Input is valid", () => {
    });

});

describe('Print functions', () => {

    describe("Printing the input", () => {
    });

    describe("Printing the output", () => {
    });

});

describe('Store into the database', () => {

    describe("Store expedition", () => {
    });

    describe("Store analytics", () => {
    });

});