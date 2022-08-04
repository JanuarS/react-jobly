import React from 'react';
import { BrowserRouter } from "react-router-dom";

import Homepage from './pages/Homepage';
import Companies from './pages/Companies';
import NavBar from './components/Navbar';


import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Homepage />
      <NavBar />
      <Companies />
    </BrowserRouter>
  );
}

export default App;
