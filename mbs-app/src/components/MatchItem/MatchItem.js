import React, {useEffect} from "react";
import { MatchType } from "../../model/match.model";
import "./MatchItem.css";

function MatchItem({ match }) {
  useEffect(() => {
  }, [])

  function handleUpdate() {}

  function handleDelete() {}

  return (      
    <div className="MatchItem">
      <div className="MatchItem-left">
        <span className="MatchItem-id">{match.name}</span>
      </div>
      <div className="MatchItem-right">
        <span className="MatchItem-button fas fa-edit"
              onClick={handleUpdate}
        ></span>
        <span className="MatchItem-button fas fa-trash-alt"
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
