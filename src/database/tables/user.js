var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "user",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    username: {
      type: "varchar",
      required: true,
    },
    email: {
      type: "varchar",
      unique: true,
      required: true,
    },
    password: {
      type: "varchar",
      required: true,
    },
  },
});
