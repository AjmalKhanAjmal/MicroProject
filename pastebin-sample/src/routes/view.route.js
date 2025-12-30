const express = require("express");
const { getPaste } = require("../services/paste.service");
const { now } = require("../utils/time");

const router = express.Router();

router.get("/p/:id", async (req, res) => {
  const paste = await getPaste(req.params.id, now(req));
  if (!paste) return res.status(404).render("error");

  res.render("view", { content: paste.content });
});

module.exports = router;
