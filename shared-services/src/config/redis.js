

const redis = require('redis');
require("dotenv").config();

const client = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

client.connect().then(() => {
    console.log("Redis Connected..."  , client );
}).catch((err) => {
    console.log("Redis error: ", err);
});

client.on('error', (err) => {
    console.log("error ", err);
});

module.exports = { client};
