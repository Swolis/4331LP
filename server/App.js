// App.js
/*
    Responsible for express applications
*/
// Define the port number you want to use
const PORT = process.env.PORT || 3000; // You can choose the default port (3000) or use an environment variable
const server = require('../httpsServer.js')


// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
  });
  

