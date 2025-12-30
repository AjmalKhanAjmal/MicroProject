const express = require("express");
const { createPaste, getPaste } = require("../services/paste.service");
const { now } = require("../utils/time");

const router = express.Router();

router.post("/pastes", async (req, res) => {
  const { content, ttl_seconds, max_views } = req.body;

  if (!content || typeof content !== "string") {
    return res.status(400).json({ error: "Invalid content" });
  }

  const id = await createPaste(
    content,
    ttl_seconds,
    max_views,
    now(req)
  );

  res.json({
    id,
    url: `${process.env.BASE_URL}/p/${id}`
  });
});

router.get("/pastes/:id", async (req, res) => {
  const paste = await getPaste(req.params.id, now(req));
  if (!paste) return res.status(404).json({ error: "Not found" });

  res.json({
    content: paste.content,
    remaining_views: paste.remainingViews,
    expires_at: paste.expiresAt ? new Date(paste.expiresAt).toISOString() : null
  });
});

module.exports = router;
