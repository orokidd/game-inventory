const db = require("../models/queries");

async function getAllGames(req, res) {
  const { developer, genre } = req.query;

  let games;
  let selectedDeveloper = "";
  let selectedGenre = "";

  if (developer && developer !== "") {
    games = await db.getGamesByDeveloper(developer);
    selectedDeveloper = developer;
  }
  else if (genre && genre !== "") {
    games = await db.getGamesByGenre(genre);
    selectedGenre = genre;
  }
  else {
    games = await db.getAllGames();
  }

  const developers = await db.getAllDevelopers();
  const genres = await db.getAllGenres();

  res.render("index", { games, developers, genres, selectedDeveloper, selectedGenre });
}

module.exports = {
  getAllGames,
};

module.exports = {
  getAllGames,
};
