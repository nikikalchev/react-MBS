import React, { useState, useEffect } from 'react';
import './FMBS.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar';
import BettingsPage from './pages/BettingsPage';
import StandingsPage from './pages/StandingsPage';
import MatchesPage from './pages/MatchesPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import AboutPage from './pages/About';
import { PrivateRoute } from './components/NavBar/PrivateRoute';
import UsersPage from './pages/UsersPage';
import PersonalDataPage from './pages/PersonalDataPage';
import { logout, verifyToken } from './service/utills';

const jwt = require('jsonwebtoken');

function FMBS() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    checkIsUserLoggedIn();
  }, [])

  function checkIsUserLoggedIn() {
    const isTokenValid = verifyToken();
    setIsLoggedIn(isTokenValid);
    return isTokenValid;
  }

  function handleRefresh(updatedUser){
    logout();
    const token = jwt.sign({ user: updatedUser }, 'jksf!dsf@35dsddg', { expiresIn: 86400});  
    localStorage.setItem('auth-token', token);
    setIsRefresh(isRefresh ? false : true);

  }

  return (
    <>
      <Router>
        <div>
          <Navbar onUserLogout={checkIsUserLoggedIn} isLoggedIn={isLoggedIn} isRefresh={isRefresh}/>
          <Switch>
            <Route path='/' exact component={AboutPage} />
            <PrivateRoute exact path="/betting" component={BettingsPage} />
            <Route path="/standings" component={StandingsPage} />
            <PrivateRoute exact path="/matches" component={MatchesPage} />
            <PrivateRoute exact path="/users" component={UsersPage} />
            <Route path='/info' render={() => <PersonalDataPage onRefresh={handleRefresh} />} />
            <Route path='/login' render={() => <LoginPage onUserLoggedIn={() => checkIsUserLoggedIn()} />} />
            <Route path='/register' render={() => <RegistrationPage onUserRegistration={checkIsUserLoggedIn} />} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default FMBS;
