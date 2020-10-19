const router = require("express").Router();
const Team = require("../model/Team");
const ObjectID = require("mongodb").ObjectID;

router.get("/all", async (req, res) => {
  try {
    const team = await Team.find();
    res.send(team);
  } catch (err) {
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
  }
});

router.get('/:id', async (req, res) => {
  try {
      const team = await Team.findOne({ _id: new ObjectID(req.params.id) });
      res.json(team);
  } catch (err) {
      sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
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
