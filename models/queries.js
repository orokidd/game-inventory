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

async function getGamesByGenre(genreName) {
  const query = `
    SELECT
      games.id,
      games.title,
      games.release_date,
      games.description,
      developers.name AS developer,
      COALESCE(ARRAY_AGG(genres.name) FILTER (WHERE genres.name IS NOT NULL), '{}') AS genres
    FROM games
    LEFT JOIN developers ON games.developer_id = developers.id
    LEFT JOIN game_genres ON games.id = game_genres.game_id
    LEFT JOIN genres ON game_genres.genre_id = genres.id
    WHERE games.id IN (
      SELECT game_genres.game_id
      FROM game_genres
      JOIN genres ON game_genres.genre_id = genres.id
      WHERE genres.name = $1
    )
    GROUP BY games.id, developers.name
    ORDER BY games.release_date DESC;
  `;
  const { rows } = await pool.query(query, [genreName]);
  return rows;
}

// Filter

async function getAllDevelopers() {
  const query = `
    SELECT id, name
    FROM developers
    ORDER BY name ASC;
  `;
  const { rows } = await pool.query(query);
  return rows;
}

async function getAllGenres() {
  const query = `
    SELECT id, name
    FROM genres
    ORDER BY name ASC;
  `;
  const { rows } = await pool.query(query);
  return rows;
}

module.exports = {
  getAllGames,
  getGamesByDeveloper,
  getGamesByGenre,
  getAllDevelopers,
  getAllGenres,
};
