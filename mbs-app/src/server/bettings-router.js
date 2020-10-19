const router = require("express").Router();
const Betting = require("../model/Betting");
const User = require("../model/User");
const ObjectID = require("mongodb").ObjectID;
var _ = require("underscore-node");
const { db } = require("../model/Betting");

router.get("/:userId", async (req, res) => {
  try {
    const bettings = await Betting.find({ "user._id": req.params.userId });
    res.send(bettings);
  } catch (err) {
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
  }
});

router.get("/aggregation/:dummy", async (req, res) => {
  try {
    const bettings = await Betting.aggregate([
      { $group: { _id: "$user.name", sum: { $sum: "$match_points" } } },
    ]);
    bettings.sort((a, b) => (a.sum < b.sum ? 1 : -1));
    res.send(bettings);
  } catch (err) {
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
  }
});

router.get("/:matchId/:user", async (req, res) => {
  try {
    const betting = await Betting.findOne({
      matchId: req.params.matchId,
      "user._id": req.params.user,
    });
    res.send(betting);
  } catch (err) {
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
  }
});

router.put("/update/:id", async (req, res) => {
  const old = await Betting.findOne({ _id: new ObjectID(req.params.id) });
  if (!old) {
    sendErrorResponse(
      req,
      res,
      404,
      `Betting with ID=${req.params.id} does not exist`
    );
    return;
  }
  const betting = req.body;
  if (old._id.toString() !== betting._id) {
    sendErrorResponse(
      req,
      res,
      400,
      `Betting ID=${betting._id} does not match URL ID=${req.params.id}`
    );
    return;
  }
  const r = await Betting.updateOne(
    { _id: new ObjectID(req.params.id) },
    { $set: betting }
  );
  res.json(betting);
});

router.delete("/delete/:matchId", async (req, res) => {
  const bettingToDelete = Betting.find({ matchId: req.params.matchId });
  if (!bettingToDelete) {
    sendErrorResponse(
      req,
      res,
      404,
      `Match with ID=${req.params.matchId} does not exist`
    );
    return;
  }
  await Betting.delete({ matchId: req.params.matchId });
  res.send("Betting deleted!");
});

router.post("/create", async (req, resp) => {
  const betting = new Betting({
    matchId: req.body.matchId,
    user: req.body.user,
    prediction: req.body.prediction,
  });
  try {
    const savedBetting = await betting.save();
    resp.send(savedBetting);
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
