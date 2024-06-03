const db = require("../src/database/db");

async function initializeDB() {
  try {
    await db.initialize();
  } catch {
    return db;
  }
}

async function clearAllTables() {
  const entities = db.entityMetadatas;

  for (const entity of entities) {
    const repository = db.getRepository(entity.name);
    await repository.clear();
  }
}

async function getRecordFromDB(entityName, fieldName, value) {
  const repository = db.getRepository(entityName);
  return await repository.findOne({
    where: { [fieldName]: value },
  });
}

const movies = [
  {
    id: 1,
    tmdbId: 940721,
    title: "Godzilla Minus One",
    description:
      "Postwar Japan is at its lowest point when a new crisis emerges in the form of a giant monster, baptized in the horrific power of the atomic bomb.",
    rating: 7.7,
    releaseDate: "2023-11-03",
    poster: "/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg",
    thumbnail: "/fY3lD0jM5AoHJMunjGWqJ0hRteI.jpg",
    director: "Takashi Yamazaki",
    trailerLink: "VvSrHIX5a-0",
    runtime: 125,
    voteCount: 938,
    isAdult: false,
    tagLine: "Postwar Japan. From zero to minus.",
    actors: [
      {
        id: 1,
        tmdbId: 225730,
        name: "Ryunosuke Kamiki",
        type: "Acting",
        image: "/ut7ewXjdgUmgkhJ1EtbOo9tbc7s.jpg",
        gender: "male",
      },
      {
        id: 2,
        tmdbId: 1516266,
        name: "Minami Hamabe",
        type: "Acting",
        image: "/eQN8N2chINckvQDiNqzDXI0v9vN.jpg",
        gender: "female",
      },
    ],
    genres: [
      {
        id: 2,
        tmdbId: 27,
        name: "Horror",
      },
      {
        id: 1,
        tmdbId: 878,
        name: "Science Fiction",
      },
    ],
  },
  {
    id: 2,
    tmdbId: 653346,
    title: "Kingdom of the Planet of the Apes",
    description:
      "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
    rating: 7.2,
    releaseDate: "2024-05-08",
    poster: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    thumbnail: "/fypydCipcWDKDTTCoPucBsdGYXW.jpg",
    director: "Wes Ball",
    trailerLink: "Kdr5oedn7q8",
    runtime: 145,
    voteCount: 209,
    isAdult: false,
    tagLine: "No one can stop the reign.",
    actors: [
      {
        id: 33,
        tmdbId: 1586047,
        name: "Owen Teague",
        type: "Acting",
        image: "/tgCkGE0LIggyjMmgSwHhpZAkfJs.jpg",
        gender: "male",
      },
      {
        id: 34,
        tmdbId: 2146942,
        name: "Freya Allan",
        type: "Acting",
        image: "/cjsSdfv9U8PboNG1SNfnvd5558T.jpg",
        gender: "female",
      },
    ],
    genres: [
      {
        id: 3,
        tmdbId: 28,
        name: "Action",
      },
      {
        id: 4,
        tmdbId: 12,
        name: "Adventure",
      },
    ],
  },
];
async function addDummyData() {
  const movieRepository = db.getRepository("movie");
  const actorRepository = db.getRepository("actor");
  const genreRepository = db.getRepository("genre");
  for (const movie of movies) {
    for (const actor of movie.actors) {
      const newActor = actorRepository.create(actor);
      await actorRepository.save(newActor);
    }
    for (const genre of movie.genres) {
      const newGenre = genreRepository.create(genre);
      await genreRepository.save(newGenre);
    }
    const newMovie = movieRepository.create(movie);
    await movieRepository.save(newMovie);
  }
}

module.exports = {
  initializeDB,
  clearAllTables,
  addDummyData,
  getRecordFromDB,
};
