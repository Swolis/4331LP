const request = require('supertest');
const app = require('../ExpressApp'); // Import your Express app

describe('Express Application Integration Tests', function () {

  it('should return a 200 response with a valid token', function (done) {
    this.timeout(20000);
    request(app)
      .post('/Admin-Login')
      .send({ username: 'testName', password: 'password' }) // Include data in the request body
      .expect(200)
      .end(done);
  });

});


// function buildTokenForTest() {
//     const secretKey = 'SecretKey';
//     const payload = {
//         username: 'testName',
//         hashedPassword: 'password',
//     };

//     const token = jwt.sign(payload, secretKey, { expiresIn: '1h'});

//     console.log('token: ', token);

//     return token;
// }