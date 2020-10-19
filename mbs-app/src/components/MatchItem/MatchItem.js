import React from "react";
import { MatchType } from "../../model/match.model";
import "./MatchItem.css";

function MatchItem({ match, onClickEdit, onClickDelete }) {
  function handleUpdate() {
    onClickEdit(match);
  }

  function handleDelete() {
    onClickDelete(match);
  }

  return (
    <div className="MatchItem">
      <div className="MatchItem-left">
        <img src={match.team1.logo} alt="logo-team1" />
        <span className="MatchItem-id">
          <font>{match.team1.name}</font>
        </span>
      </div>
      {match.goalsTeam1 && match.goalsTeam2 ? (
        <div className="MatchItem-result">
          {match.goalsTeam1} - {match.goalsTeam2}
        </div>
      ) : (
        <div className="MatchItem-result"> &nbsp; - </div>
      )}
      <div className="MatchItem-left">
        <img src={match.team2.logo} alt="logo-team2" />
        <span className="MatchItem-id">
          <font>{match.team2.name}</font>
        </span>
      </div>
      <div className="MatchItem-right">
        <span
          className="MatchItem-button fas fa-edit"
          title="edit"
          onClick={handleUpdate}
        ></span>
        <span
          className="MatchItem-delete fas fa-trash-alt"
          title="delete"
          onClick={handleDelete}
        ></span>
      </div>
    </div>
  );
}

MatchItem.propTypes = {
  match: MatchType.isRequired,
};

export default MatchItem;
