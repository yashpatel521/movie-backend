const { createActorsIfNotExists } = require("../controllers/actor");
const { createGenreIfNotExists } = require("../controllers/genre");
const { createMoviesIfNotExists } = require("../controllers/movie");
const { createUserIfNotExists } = require("../controllers/user");
const db = require("./db");
const cliProgress = require("cli-progress");

const dataPopulator = async () => {
  console.log("Inserting Records .... ");
  const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.legacy);

  await db.initialize();
  const movies = require("./json/movie.json");

  bar1.start(movies.length, 0); // Start the progress bar with the total number of movies

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    var actors = [];
    var genres = [];
    for (const actor of movie.actors) {
      const temp = await createActorsIfNotExists(actor);
      actors.push(temp);
    }

    for (const genre of movie.genres) {
      const temp = await createGenreIfNotExists({
        tmdbId: genre.id,
        name: genre.name,
      });
      genres.push(temp);
    }
    movie.actors = actors;
    movie.genres = genres;
    await createMoviesIfNotExists(movie);

    bar1.update(i + 1); // Update the progress bar after each movie is processed
  }

  const user = {
    username: "User1",
    password: "User1234",
    email: "user1@user.com",
  };

  await createUserIfNotExists(user);

  bar1.stop();
};

dataPopulator().catch(console.error);
module.exports = dataPopulator;
