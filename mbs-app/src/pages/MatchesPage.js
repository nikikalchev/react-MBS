import React, { useEffect, useState } from "react";
import MatchItem from "../components/MatchItem/MatchItem";
import MatchEdit from "../components/MatchItem/MatchEdit";
import matchesApi from "../service/matches-api";
import bettingsApi from "../service/bettings-api";

function MatchesPage() {

  const [matches, setMatches] = useState([]);
  const [formType, setFormType] = useState('list');
  const [editMatch, setEditMatch] = useState();
  const [mode, setMode] = useState('update');

  useEffect(() => {
    async function getMatches() {
      setMatches(await matchesApi.getMatches());
    }
    getMatches();
  }, []);

  function handleEditClick(match) {
    setFormType('edit');
    setMode('update');
    setEditMatch(match);
  }

  async function handleDeleteClick(matchToDelete) {
    await bettingsApi.deleteBetting(matchToDelete._id);
    
    await matchesApi.deleteMatch(matchToDelete._id );
    setMatches(matches.filter(match => match._id !== matchToDelete._id));
  }

  function handleCancelClick() {
    setFormType('list');
  }

  async function handleSaveClick(updatedMatch) {
    setEditMatch(updatedMatch);
    if (mode === 'create') {
      setMatches(matches.concat(updatedMatch));
    } else {
      setMatches(matches.map(match => match._id === updatedMatch._id ? updatedMatch : match));
    }
    setFormType('list');
  }

  async function handleCreate() {
    setFormType('edit');
    setMode('create');
    setEditMatch({});
  }

  return (
    <div className="matches">
      <img src="../../../images/match.png" id="match-image" alt="matches" />
      {
        formType === 'list' ?
          <span className="MatchItem-create fas fa-plus" title="create"
            onClick={() => { handleCreate() }}>
          </span>
          : <></>
      }
      {
        matches.map((match) => (
          <React.Fragment key={match._id}>
            {
              formType === 'list' ?
                <MatchItem match={match}
                  onClickEdit={handleEditClick}
                  onClickDelete={handleDeleteClick} />
                : <></>
            }
          </React.Fragment>
        ))
      }
      {formType === 'edit' ?
        <MatchEdit match={editMatch}
          onClickCancel={handleCancelClick}
          onClickSave={handleSaveClick}
          mode={mode} />
        : <></>
      }
    </div>

  );
}

export default MatchesPage;