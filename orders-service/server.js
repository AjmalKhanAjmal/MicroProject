const express = require("express")
const http = require("http");

const app =  express()

const { initSocket} = require("./src/socket/index");
const {route}=  require("./src/routes/order_routes")
// const {worker} = require("./src/utills/email_consumer")

const {bullMqConsumer} = require("./src/utills/email_consumer")


require("dotenv").config()

const server = http.createServer(app);

app.use(route)


initSocket(server);

server.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});


//Importtatnt 
//++++++++++++++++

// app.listen(5000);
// Behind the scenes Express does this 👇

// js
// Copy code
// const server = http.createServer(app);
// server.listen(5000);





// app.listen(process.env.SERVER_PORT,()=>{
//     console.log("server running on PORT : ",process.env.SERVER_PORT);
    
// })





// const PORT = 5000;

// create HTTP server
// const server = http.createServer(app);

// init socket.io
