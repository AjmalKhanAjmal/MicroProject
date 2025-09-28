require("dotenv").config();
// const mongoose = require("mongoose");
const express = require("express");
const routes = require("./routes/identity_routes")
require("dotenv").config()
const app = express();
const PORT = process.env.SERVER_PORT || 3001;

//connect to mongodb
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => logger.info("Connected to mongodb"))
//   .catch((e) => logger.error("Mongo connection error", e));
app.use(express.json());

app.use(routes)
//apply this sensitiveEndpointsLimiter to our routes
// app.use("/api/auth/register", sensitiveEndpointsLimiter);

//Routes
// app.use("/api/auth", routes);


app.listen(PORT, () => {
  console.log(`Identity service running on port ${PORT}`);
});
