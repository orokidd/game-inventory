const pool = require("./pool");

async function getAllGames() {
  const query = `
    SELECT
      games.id,
      games.title,
      games.release_date,
      games.description,
      developers.name AS developer,
      COALESCE(ARRAY_AGG(genres.name), '{}') AS genres
    FROM games
    LEFT JOIN developers
      ON games.developer_id = developers.id
    LEFT JOIN game_genres
      ON games.id = game_genres.game_id
    LEFT JOIN genres
      ON game_genres.genre_id = genres.id
    GROUP BY games.id, developers.name
    ORDER BY games.id;
  `;

  const { rows } = await pool.query(query);
  return rows;
}

async function getGamesByDeveloper(developer) {
  const query = `
    SELECT
      games.id,
      games.title,
      games.release_date,
      games.description,
      developers.name AS developer,
      COALESCE(ARRAY_AGG(genres.name), '{}') AS genres
    FROM games
    LEFT JOIN developers
      ON games.developer_id = developers.id
    LEFT JOIN game_genres
      ON games.id = game_genres.game_id
    LEFT JOIN genres
      ON game_genres.genre_id = genres.id
    WHERE developers.name ILIKE $1
    GROUP BY games.id, developers.name
    ORDER BY games.id;
  `;

  const { rows } = await pool.query(query, [`%${developer}%`]);
  return rows;
}

async function getGamesByGenre(genre) {
  const query = `
    SELECT
      games.id,
      games.title,
      games.release_date,
      games.description,
      developers.name AS developer,
      COALESCE(ARRAY_AGG(genres.name), '{}') AS genres
    FROM games
    LEFT JOIN developers
      ON games.developer_id = developers.id
    LEFT JOIN game_genres
      ON games.id = game_genres.game_id
    LEFT JOIN genres
      ON game_genres.genre_id = genres.id
    GROUP BY games.id, developers.name
    HAVING ARRAY_AGG(genres.name) @> ARRAY[$1]
    ORDER BY games.id;
  `;

  const { rows } = await pool.query(query, [genre]);
  return rows;
}

module.exports = {
  getAllGames,
  getGamesByDeveloper,
  getGamesByGenre,
};
