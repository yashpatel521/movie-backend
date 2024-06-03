const db = require("../database/db");
const actorTable = db.getRepository("actor");

const allActors = async (req, res) => {
  const id = req.query.id;
  var result;

  if (id) {
    result = await actorTable
      .createQueryBuilder("actor")
      .leftJoinAndSelect("actor.movies", "movie")
      .where("actor.id = :id", { id: id })
      .getOne();
    if (result)
      res.status(200).json({
        success: true,
        data: result,
      });
    else
      res.status(404).json({
        success: false,
        message: "Actor not found",
      });
  } else {
    var count;
    const search = req.query.search?.toLowerCase();
    const page = req.query.page ?? 1;
    const limit = 12;
    if (search) {
      result = await actorTable
        .createQueryBuilder("actor")
        .skip((page - 1) * limit)
        .take(limit)
        .getMany();
      count = await actorTable
        .createQueryBuilder("actor")
        .where("LOWER(actor.name) LIKE :name", { name: `%${search}%` })
        .getCount();
    } else {
      result = await actorTable
        .createQueryBuilder("actor")
        .skip((page - 1) * limit)
        .take(limit)
        .getMany();
      count = await actorTable.createQueryBuilder("actor").getCount();
    }
    res.status(200).json({
      success: true,
      data: { results: result, pageNo: page, totalResults: count },
    });
  }
};

const createActorsIfNotExists = async (actor) => {
  const actorRepository = db.getRepository("actor");
  const actorsExists = await actorRepository.findOne({
    where: { tmdbId: actor.tmdbId },
  });
  if (actorsExists) return actorsExists;
  const newActor = await actorRepository.create(actor);
  await actorRepository.save(newActor);
  return newActor;
};

module.exports = { allActors, createActorsIfNotExists };
