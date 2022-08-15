import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CompanyDetails from './pages/CompanyDetails';
import Homepage from './pages/Homepage';
import Companies from './pages/Companies';
import Jobs from './pages/Jobs';
import NavBar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import JoblyApi from './api';
import UserContext from './auth/UserContext';
import jwt from "jsonwebtoken";

import useLocalStorage from './hooks/useLocalStorage';

export const TOKEN_STORAGE_ID = "jobly-token";

// import logo from './logo.svg';
// import './App.css';
// import User from '../../models/user';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [applicationIds, setApplicationIds] = useState(new Set([]));


  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);

          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);

        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
    }

    getCurrentUser();
  }, [token]);

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success:true };
    } catch(errors) {
      console.errors("login failed", errors);
      return { success: false, errors};
    }
  }

  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch(errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
      
        <NavBar logout={logout}/>

        <Switch>
          <Route exact path="/companies/:handle">
            <CompanyDetails />
          </Route>

          <Route exact path="/companies">
            <Companies />
          </Route>

          <Route exact path="/jobs">
            <Jobs />
          </Route>

          <Route exact path="/login">
            <Login login={login} />
          </Route>

          <Route exact path="/signup">
            <Signup signup={signup} />
          </Route>

          <Route exact path="/profile">
            <Profile />
          </Route>
            
          <Route exact path="/">
            <Homepage />
          </Route>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>


  );
}

export default App;
