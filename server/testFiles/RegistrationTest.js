const request = require("supertest");
const app = require('../ExpressApp');
const { default: mongoose } = require("mongoose");

describe('Express Registration Integration Test', function () {
    before(async function () {
        this.timeout(10000); // Increase timeout to 10 seconds
        const numConnectionsAtStart = mongoose.connections.length;
        console.log(`Number of open connections at the start of test: ${numConnectionsAtStart}`);
        await mongoose.connection.close(); // Close all connections before all tests
        console.log(`Number of open connections at the start of test after close call: ${numConnectionsAtStart}`);
        console.log(`connection name: ${ mongoose.connection.name}`);
        console.log(`readystate: ${mongoose.connection.readyState}`);
    });

    after(async function () {
        this.timeout(10000); // Increase timeout to 10 seconds
        await mongoose.connection.close(); // Close all connections after all tests
    });

    it('Should return a 200 OK', function (done) {
        this.timeout(200000);

        request(app)
            .post('/Admin-Registration')
            .send({
                username: 'testUser4',
                password: 'password1',
                email: 'testEmail1@.test.com',
                phone: '123-456-7891',
                address: '1881 lovelyLane'
            })
            .expect(200) // Add an assertion here
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
});
