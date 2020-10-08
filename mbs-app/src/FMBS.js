import React from 'react';
import './FMBS.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar';
import BettingsPage from './pages/BettingsPage';
import StandingsPage from './pages/StandingsPage';
import MatchesPage from './pages/MatchesPage';
import LoginPage from './pages/LoginPage';

function FMBS() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch> 
          <Route path='/' exact component={BettingsPage} />
          <Route path='/standings' component={StandingsPage} />
          <Route path='/matches' component={MatchesPage} />
          <Route path='/login' component={LoginPage} />
        </Switch>
      </Router>
    </>
  );
}

export default FMBS;
