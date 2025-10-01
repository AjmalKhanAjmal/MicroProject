const mongoose = require("mongoose");
require("dotenv").config();
const url = `${process.env.MONGO_HOST_URL}:${process.env.MONGO_PORT}`;

(async () => {
    try {
        // Wait for mongoose to connect
        await mongoose.connect(url);
        console.log("connected to db");
    } catch (error) {
        console.log(error.message);
    }
})();
