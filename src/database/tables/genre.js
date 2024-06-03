var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "genre",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    tmdbId: {
      type: "int",
      required: true,
      unique: true,
    },
    name: {
      type: "varchar",
      required: true,
      unique: true,
    },
  },
  relations: {
    movies: {
      target: "movie", // the name of the Movie schema
      type: "many-to-many",
      inverseSide: "genres", // the field in the Movie schema that this relates to
    },
  },
});
