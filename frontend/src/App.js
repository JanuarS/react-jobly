import React from 'react';
import { BrowserRouter } from "react-router-dom";

import Homepage from './pages/Homepage';


import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Homepage />
    </BrowserRouter>
  );
}

export default App;
