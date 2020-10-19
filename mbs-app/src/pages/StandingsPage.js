import React, { useEffect, useState } from "react";
import "../components/StandingItem/StandingItem.css";
import bettingsApi from "../service/bettings-api";

function StandingsPage() {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    async function getStandings() {
      const dummy = 1;
      const bettings = await bettingsApi.getBettingsAggregation(dummy);
      setStandings(bettings);
    }
    getStandings();
  }, []);

  return (
    <div className="standings">
      <img
        src="../../../images/standings.png"
        id="standing-image"
        alt="standings"
      />
      <table id="table-standings">
        <thead>
          <tr>
            <th id="number-column">№</th>
            <th id="name-column">Name</th>
            <th id="points-column">Points</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing, i) => (
            <React.Fragment key={i}>
              {
                <tr>
                  <td>{++i}</td>
                  <td>{standing._id}</td>
                  <td>{standing.sum}</td>
                </tr>
              }
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StandingsPage;
