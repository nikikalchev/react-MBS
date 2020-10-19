import React, { useState, useEffect } from "react";
import { BettingType } from "../../model/betting.model";
import "./BettingItem.css";
import matchesApi from "../../service/matches-api";

function BettingItem({ bet }) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function getMatches() {
      setMatches(await matchesApi.getMatchById(bet.matchId));
    }
    getMatches();
  });

  function onRadioClick(event){
      bet.prediction = event.target.value;
      console.log(bet);
  }

  return matches.map((match) => (
    <React.Fragment key={bet._id}>
      {
        <div className="BettingItem">
          <div className="BettingItem-left">
            <img src={match.team1.logo} alt="logo-team1" />
            <span className="BettingItem-id">
              <font>{match.team1.name}</font>
            </span>
          </div>
          {match.goalsTeam1 && match.goalsTeam2 ? (
            <div className="prediction-result">
              {match.goalsTeam1} - {match.goalsTeam2}
            </div>
          ) : (
            <div className="prediction-result">
              <input type="radio" id="1b" name={bet._id} value="1" onClick={onRadioClick} defaultChecked={bet.prediction === "1" ? "checked" : ""}></input>
              <label htmlFor="1b">1</label>
              <input type="radio" id="xb" name={bet._id} value="X" onClick={onRadioClick} defaultChecked={bet.prediction === "X" ? "checked" : ""}></input>
              <label htmlFor="xb">X</label>
              <input type="radio" id="2b" name={bet._id} value="2" onClick={onRadioClick} defaultChecked={bet.prediction === "2" ? "checked" : ""}></input>
              <label htmlFor="2b">2</label>
            </div>
          )}
          <div className="BettingItem-left">
            <img src={match.team2.logo} alt="logo-team2" />
            <span className="BettingItem-id">
              <font>{match.team2.name}</font>
            </span>
          </div>
        </div>
      }
    </React.Fragment>
  ));
}

BettingItem.propTypes = {
  bet: BettingType.isRequired,
};

export default BettingItem;
