const amqp = require("amqplib");
const {createProduct} = require("../services/product_service")

async function emailConsumer() {
    try {
        const conn = await amqp.connect("amqp://localhost");
        const ch = await conn.createChannel();

        await ch.assertExchange("product_exchange", "direct");
        await ch.assertQueue("product_queue");
        // order.created → email_queue
        await ch.bindQueue("product_queue", "product_exchange", "product.created");


        ch.consume("product_queue", msg => {
            console.log("📧 EMAIL:", msg.content.toString());

            createProduct(
                "Mutton Biryani",        // name
                250,                     // price
                "Hyderabadi special",    // description
                true,                    // status
                1,                       // category_id
                2,                       // store_id
                "restaurant",            // service_type
                5,                       // subscribed_application_id
                1,               // product_id
                2,                // variant_id
                3                        // tax_category_id
            )
            ch.ack(msg);
        });

    } catch (error) {
        console.log("error", error.message);

    }
}

// emailConsumer();


module.exports = {emailConsumer}


