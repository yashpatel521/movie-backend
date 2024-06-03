var EntitySchema = require("typeorm").EntitySchema;

var MovieSchema = new EntitySchema({
  name: "movie",
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
    title: {
      type: "varchar",
      required: true,
      unique: true,
    },
    description: {
      type: "text",
    },
    rating: {
      type: "float",
      required: true,
    },
    releaseDate: {
      type: "date",
      required: true,
    },
    poster: {
      type: "varchar",
      required: true,
    },
    thumbnail: {
      type: "varchar",
      required: true,
    },
    director: {
      type: "varchar",
      required: true,
    },
    trailerLink: {
      type: "varchar",
      required: false,
      nullable: true,
    },
    runtime: {
      type: "int",
      required: true,
      default: 0,
    },
    voteCount: {
      type: "int",
      required: true,
      default: 0,
    },
    isAdult: {
      type: "boolean",
      required: true,
      default: false,
    },
    tagLine: {
      type: "varchar",
      required: false,
      nullable: true,
    },
  },
  relations: {
    actors: {
      target: "actor", // the name of the Actor schema
      type: "many-to-many",
      joinTable: true, // this is the owner side
      cascade: true,
      inverseSide: "movies", // the field in the Actor schema that this relates to
    },
    genres: {
      target: "genre", // the name of the Genre schema
      type: "many-to-many",
      joinTable: true, // this is the owner side
      cascade: true,
      inverseSide: "movies", // the field in the Genre schema that this relates to
    },
  },
});

module.exports = MovieSchema;
