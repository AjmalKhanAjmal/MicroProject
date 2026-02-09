const { Queue } = require("bullmq");
const { client } = require("../config/redis");

const emailQueue = new Queue("email-queue", {
  client,
  defaultJobOptions: {
    removeOnComplete: 100, // keep last 100 jobs
    removeOnFail: 50,
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000
    }
  }
});

module.exports = { emailQueue };
