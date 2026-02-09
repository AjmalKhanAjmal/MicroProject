// const { emailQueue } = require("../../../queues/email.queue");
const { emailQueue } = require("../../queues/email.queue")

const sendOrderEmail = async (data) => {
    await emailQueue.add("send-order-email", data, {
        jobId: `order-email-${data.orderNumber}`
    });
};


async () => {
    await sendOrderEmail({
        to: "user@test.com",
        customerName: "John",
        orderNumber: "398493klm"
    })()
}

module.exports = { sendOrderEmail };
// C:\MicroSe\orders-service\src\queues