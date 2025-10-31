require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");

const indexRouter = require("./routes/indexRouter");
const gamesRouter = require("./routes/gamesRouter");
const devsRouter = require("./routes/devsRouter");
const newGameRouter = require("./routes/newGameRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/games", gamesRouter);
app.use("/devs", devsRouter);
app.use("/newgame", newGameRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});