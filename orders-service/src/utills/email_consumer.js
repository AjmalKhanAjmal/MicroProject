const amqp = require("amqplib");

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

emailConsumer();
