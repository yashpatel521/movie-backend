const { allGenre } = require("../controllers/genre");

const router = require("express").Router();

router.get("/", allGenre);

module.exports = router;
