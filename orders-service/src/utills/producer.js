//Producer (GOOD – uses exchange)

const amqp = require("amqplib");


async function producer() {
  const conn = await amqp.connect("amqp://localhost");
  const ch = await conn.createChannel();

  const exchange = "order_exchange";

  await ch.assertExchange(exchange, "direct");

  // Send events
  ch.publish(exchange, "order.created", Buffer.from("Order Created"));
  ch.publish(exchange, "order.shipped", Buffer.from("Order Shipped"));
  ch.publish(exchange, "order.cancelled", Buffer.from("Order Cancelled"));

  console.log("✅ Order events published");

  setTimeout(() => conn.close(), 500);
}

producer();



// 🔴 Producer (BAD – direct to queues)

// const amqp = require("amqplib");

// async function producer() {
//   const conn = await amqp.connect("amqp://localhost");
//   const ch = await conn.createChannel();

//   // Queues
//   await ch.assertQueue("email_queue");
//   await ch.assertQueue("sms_queue");
//   await ch.assertQueue("refund_queue");

//   // order.created → email
//   ch.sendToQueue("email_queue", Buffer.from("Order Created"));

//   // order.shipped → sms
//   ch.sendToQueue("sms_queue", Buffer.from("Order Shipped"));

//   // order.cancelled → refund
//   ch.sendToQueue("refund_queue", Buffer.from("Order Cancelled"));

//   console.log("❌ Messages sent directly to queues");

//   setTimeout(() => conn.close(), 500);
// }

// producer();
