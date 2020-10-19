import React, { useState, useRef, useEffect } from "react";
import { MatchType } from "../../model/match.model";
import "./MatchEdit.css";
import matchesApi from "../../service/matches-api";
import teamsApi from "../../service/teams-api";
import bettingsApi from "../../service/bettings-api";
import usersApi from "../../service/users-api";
import Betting from "../../model/Betting";

function MatchEdit({ match, onClickCancel, onClickSave, mode }) {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function getTeams() {
      setTeams(await teamsApi.getTeams());
    }
    getTeams();
  }, []);

  const [updatedMatch, setUpdatedMatch] = useState(match);
  const [valid, setValid] = useState(true);
  const errorField = useRef(null);
  const formField = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
    let savedMatch = null;
    const users = await usersApi.getUsers();
    if (mode === "create") {
      savedMatch = await matchesApi.createMatch(updatedMatch);
      
      users.map(async (user) => {
        const bet = new Betting({ matchId: savedMatch._id, user: user });
        await bettingsApi.createBetting(bet);
      });
  
    } else {
      if(updatedMatch.goalsTeam1 && updatedMatch.goalsTeam2){
        const users = await usersApi.getUsers();
        users.map(async (user) => {
          const betting = await bettingsApi.getBetting(updatedMatch._id, user._id);
          let points = 0;
          if(parseInt(updatedMatch.goalsTeam1) > parseInt(updatedMatch.goalsTeam2)){
            if(betting.prediction === '1'){
              points = 1;
            }
          }
          if(parseInt(updatedMatch.goalsTeam1) < parseInt(updatedMatch.goalsTeam2)){
            if(betting.prediction === '2'){
              points = 1;
            }
          }
          if(parseInt(updatedMatch.goalsTeam1) === parseInt(updatedMatch.goalsTeam2)){
            if(betting.prediction === 'X'){
              points = 2;
            }
          }
          betting.match_points = points;
          await bettingsApi.updateBetting(betting);
        });
      }
      savedMatch = await matchesApi.updateMatch(updatedMatch);
    }
    if (savedMatch) {
      if (!savedMatch.error) {
        setValid(savedMatch.error ? false : true);
        if(errorField.current){
          errorField.current.value = savedMatch.error;
          errorField.current.focus();
        }
        onClickSave(savedMatch);
      }
    }
  }

  function handleCancel() {
    onClickCancel();
  }

  const handleTeam1Changed = (event) => {
    updateMatch(event);
  };

  const handleTeam2Changed = (event) => {
    updateMatch(event);
  };

  const handleGoalsTeam1Changed = (event) => {
    updateMatch(event);
  };
  const handleGoalsTeam2Changed = (event) => {
    updateMatch(event);
  };

  async function updateMatch(event) {
    const value = event.target.value;
    if (event.target.name === "team1") {
      setUpdatedMatch({
        ...updatedMatch,
        team1: await teamsApi.getTeamById(value),
      });
    } else if (event.target.name === "team2") {
      setUpdatedMatch({
        ...updatedMatch,
        team2: await teamsApi.getTeamById(value),
      });
    } else {
      setUpdatedMatch({
        ...updatedMatch,
        [event.target.name]: value,
      });
    }
  }

  function onClickSubmit(event) {
    formField.current.dispatchEvent(new Event("submit", { cancelable: true }));
  }

  return (
    <div className="main-container">
      <form onSubmit={handleSubmit} ref={formField}>
        <input
          type="text"
          className={valid ? "valid" : "invalid"}
          ref={errorField}
          readOnly
        />
        <label htmlFor="team1">Host</label>
        <select
          name="team1"
          id="team1"
          className="form-select"
          value={updatedMatch.team1 ? updatedMatch.team1._id : ""}
          onChange={handleTeam1Changed}
        >
          <option key="team1Key" value=""></option>
          {teams.map((team, i = 20) => (
            <option key={i++} value={team._id}>
              {team.name}
            </option>
          ))}
        </select>
        <label htmlFor="team2">Guest</label>
        <select
          name="team2"
          id="team2"
          className="form-select"
          value={updatedMatch.team2 ? updatedMatch.team2._id : ""}
          onChange={handleTeam2Changed}
        >
          <option key="team2Key" name="optionTeam2" value=""></option>
          {teams.map((team, i = 10) => (
            <option key={i++} name="optionTeam2" value={team._id}>
              {team.name}
            </option>
          ))}
        </select>
        <div>
          <label htmlFor="result">Result</label>
          <span id="result">
            <input
              className="goals-format"
              type="number"
              min="0"
              max="99"
              name="goalsTeam1"
              id="goalsTeam1"
              defaultValue={updatedMatch.goalsTeam1}
              onChange={handleGoalsTeam1Changed}
            />
            :
            <input
              type="number"
              className="goals-format"
              name="goalsTeam2"
              id="goalsTeam2"
              min="0"
              max="99"
              defaultValue={updatedMatch.goalsTeam2}
              onChange={handleGoalsTeam2Changed}
            />
          </span>
        </div>
        <div>
          <span
            onClick={onClickSubmit}
            className="MatchEdit-button fas fa-save"
          />
          <span
            className="UserEdit-delete fas fa-close"
            id="cancel"
            onClick={handleCancel}
          ></span>
        </div>
      </form>
    </div>
  );
}

MatchEdit.propTypes = {
  match: MatchType.isRequired,
};

export default MatchEdit;
