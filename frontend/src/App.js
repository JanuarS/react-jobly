import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CompanyDetails from './pages/CompanyDetails';
import Homepage from './pages/Homepage';
import Companies from './pages/Companies';
import NavBar from './components/Navbar';
import JoblyApi from './api';
import UserContext from './auth/UserContext';
import jwt from "jsonwebtoken";

export const TOKEN_STORAGE_ID = "jobly-token";

// import logo from './logo.svg';
// import './App.css';
// import User from '../../models/user';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(TOKEN_STORAGE_ID);

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
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      
        <NavBar />

        <Switch>
          <Route exact path="/companies/:handle">
            <CompanyDetails />
          </Route>
          <Route exact path="/companies">
            <Companies />
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
