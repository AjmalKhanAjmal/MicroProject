const amqp = require("amqplib");

async function smsConsumer() {
  const conn = await amqp.connect("amqp://localhost");
  const ch = await conn.createChannel();

  await ch.assertExchange("order_exchange", "direct");
  await ch.assertQueue("sms_queue");

  // order.shipped → sms_queue
  await ch.bindQueue("sms_queue", "order_exchange", "order.shipped");

  ch.consume("sms_queue", msg => {
    console.log("📱 SMS:", msg.content.toString());
    ch.ack(msg);
  });
}

smsConsumer();
