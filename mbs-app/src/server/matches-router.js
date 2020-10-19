const router = require("express").Router();
const Match = require("../model/Match");
const ObjectID = require("mongodb").ObjectID;
const Joi = require("@hapi/joi");

router.get("/all", async (req, res) => {
  try {
    const matches = await Match.find();
    res.send(matches);
  } catch (err) {
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const match = await Match.find({_id: new ObjectID(req.params.id)});
    res.send(match);
  } catch (err) {
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
  }
});

router.put("/update/:id", async (req, res) => {
  const old = await Match.findOne({ _id: new ObjectID(req.params.id) });
  if (!old) {
    sendErrorResponse( req, res, 404, `Match with ID=${req.params.id} does not exist`);
    return;
  }
  const match = req.body;
  if (old._id.toString() !== match._id) {
    sendErrorResponse( req, res, 400, `Match ID=${match._id} does not match URL ID=${req.params.id}`);
    return;
  }
  const r = await Match.updateOne( { _id: new ObjectID(req.params.id) }, { $set: match });
  res.json(match);
});

router.delete("/delete/:id", async (req, res) => {
  const matchToDelete = Match.findOne({ _id: new ObjectID(req.params.id) });
  if (!matchToDelete) { sendErrorResponse( req, res, 404, `Match with ID=${req.params.id} does not exist`);
    return;
  }
  await Match.deleteOne({ _id: new ObjectID(req.params.id) });
  res.send("Match deleted!");
});

router.post("/create", async (req, resp) => {
  const match = new Match({
    team1: req.body.team1,
    team2: req.body.team2,
    goalsTeam1: req.body.goalsTeam1,
    goalsTeam2: req.body.goalsTeam2,
  });
  try {
    //save the user in the database
    const savedMatch = await match.save();
    resp.send(savedMatch);
  } catch (err) {
    resp.status(400).send(err);
  }
});

function sendErrorResponse(req, res, status, message, err) {
  res.status(status).json({
    code: status,
    message,
    error: err,
  });
}

module.exports = router;
