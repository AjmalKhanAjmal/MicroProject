const amqp = require("amqplib");


async function producer() {
  const conn = await amqp.connect("amqp://localhost");
  const ch = await conn.createChannel();

  const exchange = "product_exchange";

  await ch.assertExchange(exchange, "direct");
  let data = {
    product_id : 1,
    product_name : "Mutton biryani"
  }
  // Send events
  ch.publish(exchange, "product.created", Buffer.from(JSON.stringify(data)));
  
  console.log("✅ product events published");

  setTimeout(() => conn.close(), 500);
}

// producer();

module.exports = {producer}