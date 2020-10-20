import React, { useEffect, useState, useRef } from "react";
import BettingItem from "../components/BettingItem/BettingItem";
import bettingsApi from "../service/bettings-api";
import {getLoggedInUserData} from "../service/utills";

function BettingsPage() {
  const [bets, setBets] = useState([]);
  const successMessage = useRef(null);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    async function getBets() {
      const user = await getLoggedInUserData();
      const allBets = await bettingsApi.getBettings(user._id);
      setBets(allBets);
    }
    getBets();
  }, []);

  function handleSubmitForm(event) {
    event.preventDefault();
    bets.map(async (bet) => {
      return await bettingsApi.updateBetting(bet);
    });
    setBets(bets);
    setSuccessMsg(true);
    successMessage.current.value =
      "Your predictions are submitted successfully.";
    successMessage.current.focus();
    setTimeout(() => {
      setSuccessMsg(false);
    }, 3000);
  }

  return (
    <div className="bettings">
      <img src="../../../images/bet.png" id="bet-image" alt="bets" />
      <input
        type="text"
        className={successMsg ? "visible-bet-msg" : "invisible-bet-msg"}
        ref={successMessage}
        readOnly
      />
      <form id="betting-form" onSubmit={handleSubmitForm}>
        {bets.map((bet) => (
          <React.Fragment key={bet._id}>
            {<BettingItem bet={bet} />}
          </React.Fragment>
        ))}
        {bets.length > 0 ?
          <button type="submit" id="submit-bet">
            Submit
          </button>
          : <></>
        }
      </form>
    </div>
  );
}

export default BettingsPage;
