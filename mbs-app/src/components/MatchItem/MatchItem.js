import React from "react";
import { MatchType } from "../../model/match.model";

function MatchItem({ match }) {
  return (
    <div>
        <div>
            <span>
                <img style={{width:"32px"}} src={require('../../logos/arsenal.png')} alt=""></img>
            </span>
            <span>Arsenal</span>
            <span>01.03.2020</span>
            <span>Manchester United</span>
            <span>
                <img style={{width:"32px"}} src={require('../../logos/arsenal.png')} alt=""></img>
            </span>
        </div>
    </div>
  );
}

MatchItem.propTypes = {
  match: MatchType.isRequired,
};

export default MatchItem;
