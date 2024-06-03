const { allActors } = require("../controllers/actor");

const router = require("express").Router();

router.get("/", allActors);

module.exports = router;
