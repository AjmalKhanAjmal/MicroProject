// const { Queue } = require("bullmq");
// const { client } = require("../config/redis");

// const emailQueue = new Queue("email-queue", {
//   client,
//   defaultJobOptions: {
//     removeOnComplete: 100, // keep last 100 jobs
//     removeOnFail: 50,
//     attempts: 3,
//     backoff: {
//       type: "exponential",
//       delay: 2000
//     }
//   }
// });

// module.exports = { emailQueue };




const { Queue } = require("bullmq");
const connection = require("../config/redis");
// const { log } = require("handlebars");

try {
    var orderQueue ={};
    (async () => {
       orderQueue = new Queue("order_queue", { connection });
        // const order = {
        //     _id: Date.now().toString(),
        //     email: "req.body.email",
        //     name: " req.body.name",
        //     amount: "req.body.amount",
        //     userId: "req.body.userId"
        // };
        // const job = await orderQueue.add("order_created", order);

        // console.log("JOB ADDED:", job);

        // console.log("JOB ADDED ID:", job.id);
        // orderQueue.add("order_created", order);
        
    })()
}
catch (error) {
    console.log("erorrrr : ", error.message);
}

module.exports = { orderQueue };


