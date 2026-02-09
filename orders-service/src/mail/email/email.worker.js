const { Worker } = require("bullmq");
const { client } = require("../../config/redis");

const emailWorker = new Worker(
  "email-queue",
  async job => {
    console.log("📨 Processing job:", job.name);
    console.log("Data:", job.data);

    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("✅ Email sent to:", job.data.to);
  },
  { client }
);

emailWorker.on("completed", job => {
  console.log(`🎉 Job ${job.id} completed`);
});

emailWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed`, err);
});
