const express = require("express");
const redis = require("../db/redis");
const router = express.Router();

router.get("/healthz", async (req, res) => {
  await redis.ping();
  res.json({ ok: true });
});

module.exports = router;
