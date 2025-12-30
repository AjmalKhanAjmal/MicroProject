function now(req) {
  const testNow = req.headers["x-test-now-ms"];
  return testNow ? Number(testNow) : Date.now();
}

module.exports = { now };
