var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "actor",
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
    },
    type: {
      type: "varchar",
      required: true,
    },
    image: {
      type: "varchar",
      required: false,
      nullable: true,
    },
    gender: {
      type: "varchar",
      required: true,
    },
  },
  relations: {
    movies: {
      target: "movie", // the name of the Movie schema
      type: "many-to-many",
      inverseSide: "actors", // the field in the Movie schema that this relates to
    },
  },
});
