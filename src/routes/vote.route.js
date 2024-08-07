const express = require("express");
const vote = express.Router();
const voteControllers = require('../controllers/vote.controller.js');
const auth = require('../middlewares/auth.middleware');

vote.post("/create-poll", auth.authenticateToken, auth.authorization, voteControllers.createPoll);
vote.put("/update-poll", auth.authenticateToken, auth.authorization, voteControllers.updatePoll);
vote.get("/get-poll", auth.authenticateToken, voteControllers.getPoll);
vote.delete("/delete-poll", voteControllers.deletePoll);
vote.post("/create-option", auth.authenticateToken, auth.authorization, voteControllers.createOption);
vote.post("/submit", voteControllers.submit);
vote.delete("/unsubmit", voteControllers.unsubmit);
vote.get("/result-poll",auth.authenticateToken, auth.authorization, voteControllers.resultPoll);
vote.post("/test-autho", auth.authorization);

module.exports = vote;
