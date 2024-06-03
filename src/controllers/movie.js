const db = require("../database/db");
const movieTable = db.getRepository("movie");

const allMovie = async (req, res) => {
  const limit = 18;
  const id = req.query.id;
  const page = req.query.page ?? 1;
  var result;
  var count = 0;

  if (id) {
    result = await movieTable
      .createQueryBuilder("movie")
      .leftJoinAndSelect("movie.actors", "actor")
      .leftJoinAndSelect("movie.genres", "genre")
      .where("movie.id = :id", { id })
      .getOne();
    if (!result)
      res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    else
      res.status(200).json({
        success: true,
        data: result,
      });
  } else {
    const search = req.query.search?.toLowerCase();
    const genre = req.query.genre?.toLowerCase();
    if (genre) {
      result = await movieTable
        .createQueryBuilder("movie")
        .leftJoin("movie.genres", "genre")
        .where("LOWER(genre.name) = :name", { name: genre })
        .skip((page - 1) * limit)
        .take(limit)
        .getMany();

      count = await movieTable
        .createQueryBuilder("movie")
        .leftJoin("movie.genres", "genre")
        .where("LOWER(genre.name) = :name", { name: genre })
        .getCount();
    } else if (search) {
      result = await movieTable
        .createQueryBuilder("movie")
        .where("LOWER(movie.title) LIKE :name", { name: `%${search}%` })
        .skip((page - 1) * limit)
        .take(limit)
        .getMany();

      count = await movieTable
        .createQueryBuilder("movie")
        .where("LOWER(movie.title) LIKE :name", { name: `%${search}%` })
        .getCount();
    } else {
      result = await movieTable
        .createQueryBuilder("movie")
        .skip((page - 1) * limit)
        .take(limit)
        .getMany();

      count = await movieTable.createQueryBuilder("movie").getCount();
    }

    res.status(200).json({
      success: true,
      data: { results: result, pageNo: page, totalResults: count },
    });
  }
};

const createMoviesIfNotExists = async (movie) => {
  const movieRepository = db.getRepository("movie");
  const moviesExists = await movieRepository.findOne({
    where: { tmdbId: movie.tmdbId },
  });
  if (moviesExists) return moviesExists;
  const newMovie = await movieRepository.create(movie);
  await movieRepository.save(newMovie);
  return newMovie;
};

module.exports = { allMovie, createMoviesIfNotExists };
