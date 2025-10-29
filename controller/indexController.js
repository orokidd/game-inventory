const db = require("../models/queries");

async function getAllGames(req, res) {
  const { developer } = req.query;

  let games;
  if (developer && developer !== "") {
    games = await db.getGamesByDeveloper(developer);
  } else {
    games = await db.getAllGames();
  }

  const developers = await db.getAllDevelopers();

  res.render("index", {
    games,
    developers,
    selectedDeveloper: developer || "",
  });
}

module.exports = {
  getAllGames,
};
