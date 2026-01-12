const amqp = require("amqplib");

async function refundConsumer() {
  const conn = await amqp.connect("amqp://localhost");
  const ch = await conn.createChannel();

  await ch.assertExchange("order_exchange", "direct");
  await ch.assertQueue("refund_queue");

  // order.cancelled → refund_queue
  await ch.bindQueue("refund_queue", "order_exchange", "order.cancelled");

  ch.consume("refund_queue", msg => {
    console.log("💰 REFUND:", msg.content.toString());
    ch.ack(msg);
  });
}

refundConsumer();
