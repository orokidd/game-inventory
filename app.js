require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");

const indexRouter = require("./routes/indexRouter");
const gamesRouter = require("./routes/gamesRouter");
const devsRouter = require("./routes/devsRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/games", gamesRouter);
app.use("/devs", devsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});