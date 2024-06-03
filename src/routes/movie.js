const { allMovie } = require("../controllers/movie");

const router = require("express").Router();

router.get("/", allMovie);

module.exports = router;
