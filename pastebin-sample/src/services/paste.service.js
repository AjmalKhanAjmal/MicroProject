// const { v4: uuid } = require("uuid");
// import { v4 as uuid } from 'uuid';
const redis = require("../db/redis");

async function createPaste(content, ttlSeconds, maxViews, nowMs) {
  // const id = uuid();
  const id = 11


  const paste = {
    content,
    expiresAt: ttlSeconds ? nowMs + ttlSeconds * 1000 : null,
    remainingViews: maxViews ?? null
  };

  await redis.set(`paste:${id}`, JSON.stringify(paste));
  return id;
}

async function getPaste(id, nowMs) {
  const data = await redis.get(`paste:${id}`);
  if (!data) return null;

  const paste = JSON.parse(data);

  if (paste.expiresAt && nowMs > paste.expiresAt) return null;

  if (paste.remainingViews !== null) {
    if (paste.remainingViews <= 0) return null;
    paste.remainingViews -= 1;
  }

  await redis.set(`paste:${id}`, JSON.stringify(paste));
  return paste;
}

module.exports = { createPaste, getPaste };
