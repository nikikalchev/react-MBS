import React, { useEffect, useState } from "react";
import MatchItem from "../components/MatchItem/MatchItem";
import bettingsApi from "../service/bettings-api";

function MatchesPage() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function getMatches() {
      setMatches(await bettingsApi.getAllMatches());
    }
    getMatches();
  }, []);

  return(
    <div className="matches">
      {
        matches.map((match) => (
            <MatchItem key={match.id} match={match}/>
        ))
      }
    </div>
  )
}

export default MatchesPage;
