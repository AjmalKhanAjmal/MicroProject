const express = require("express");
const path = require("path");

const app = express();
require("dotenv").config();
app.use(express.json());
// app.set("view engine", "ejs");



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/api", require("./routes/health.route"));
app.use("/api", require("./routes/paste.route"));
app.use("/", require("./routes/view.route"));

app.listen(process.env.PORT, () => {
  console.log("Server running",process.env.PORT);
});


