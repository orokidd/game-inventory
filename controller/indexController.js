const db = require("../models/queries");

async function getAllGames(req, res) {
  const games = await db.getAllGames();

  res.render("index", { games: games });
}

module.exports = {
    getAllGames
}