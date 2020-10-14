import React, { useState, useEffect } from 'react';
import './FMBS.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar';
import BettingsPage from './pages/BettingsPage';
import StandingsPage from './pages/StandingsPage';
import MatchesPage from './pages/MatchesPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import { verifyToken } from './service/utills';
import AboutPage from './pages/About';
import { PrivateRoute } from './components/NavBar/PrivateRoute';
import UsersPage from './pages/UsersPage';

function FMBS() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkIsUserLoggedIn();
  }, [])

  function checkIsUserLoggedIn() {
    const isTokenValid = verifyToken();
    setIsLoggedIn(isTokenValid);
    return isTokenValid;
  }

  return (
    <>
      <Router>
        <div>
          <Navbar onUserLogout={checkIsUserLoggedIn} isLoggedIn={isLoggedIn}/>
          <Switch>
            <Route path='/' exact component={AboutPage} />
            <PrivateRoute exact path="/betting" component={BettingsPage} />
            <PrivateRoute exact path="/standings" component={StandingsPage} />
            <PrivateRoute exact path="/matches" component={MatchesPage} />
            <PrivateRoute exact path="/users" component={UsersPage} />
            <Route path='/login' render={() => <LoginPage onUserLoggedIn={() => checkIsUserLoggedIn()} />} />
            <Route path='/register' render={() => <RegistrationPage onUserRegistration={checkIsUserLoggedIn} />} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default FMBS;
