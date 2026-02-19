// const amqp = require("amqplib");

async function emailConsumer() {
  const conn = await amqp.connect("amqp://localhost");
  const ch = await conn.createChannel();

  await ch.assertExchange("order_exchange", "direct");
  await ch.assertQueue("email_queue");

  // order.created → email_queue
  await ch.bindQueue("email_queue", "order_exchange", "order.created");

  ch.consume("email_queue", msg => {
    console.log("📧 EMAIL:", msg.content.toString());
    ch.ack(msg);
  });
}

// emailConsumer();




const { Worker } = require("bullmq");
const connection = require("../config/redis");
const { sendOrderEmail } = require("../mail/email/email.service");
const { getIO } = require('../socket/index')



async function bullMqConsumer() {
  const worker = new Worker("order_queue", async (job) => {
    if (job.name == "order_created") {
      await Promise.all([sendOrderEmail(), getIO().emit("orderCreated", job.data)])
    }
  }, { connection })

  
  /*
  
    WITHOUT Promise.all (sequential)
  await sendEmail(data);
  await sendSocketNotification(data);
  
  sendEmail → wait finish (3 sec)
then sendSocket → wait finish (1 sec)
Total = 4 sec

WITH Promise.all (parallel)
await Promise.all([
 sendEmail(data),
 sendSocketNotification(data)
]);


sendEmail (3 sec)  ↘
                   → together
sendSocket (1 sec) ↗


100 jobs
each job 4 sec
= 400 sec

vs

100 jobs
each job 3 sec
= 300 sec

 
  */



  // const worker = new Worker(
  //   "orderQueue",
  //   async job => {

  //     console.log("Processing Job:", job.name);

  //     if (job.name === "order_created") {

  //       // ⭐⭐⭐ THIS IS WHERE EMAIL IS CALLED ⭐⭐⭐
  //       // await Promise.all([
  //       //   sendEmail({
  //       //     to: job.data.email,
  //       //     subject: "Order Confirmation",
  //       //     template: "order-created",
  //       //     data: {
  //       //       customerName: job.data.name,
  //       //       orderId: job.data._id,
  //       //       amount: job.data.amount
  //       //     }
  //       //   }),

  //       //   sendSocketNotification(job.data)
  //       // ]);c
  //     }
  //   },
  //   { connection }
  // );

  worker.on("completed", job => console.log("Job completed", job.id));
  worker.on("failed", (job, err) => console.log("Job failed", err));

}

// bullMqConsumer()

module.exports = { bullMqConsumer }