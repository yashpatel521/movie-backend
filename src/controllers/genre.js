const db = require("../database/db");
const genreTable = db.getRepository("genre");

const allGenre = async (req, res) => {
  const result = await genreTable.find();
  res.status(200).json({
    success: true,
    data: result,
  });
};

const createGenreIfNotExists = async (genre) => {
  const genreRepository = db.getRepository("genre");
  const genreExists = await genreRepository.findOne({
    where: { name: genre.name },
  });
  if (genreExists) return genreExists;
  const newGenre = await genreRepository.create(genre);
  await genreRepository.save(newGenre);
  return newGenre;
};

module.exports = { allGenre, createGenreIfNotExists };
