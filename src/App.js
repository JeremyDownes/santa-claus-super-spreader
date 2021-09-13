import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Player from './Components/Player/Player'
import Enemy from './Components/Enemy/Enemy'
import logo from './logo.svg';
import './App.css';

function App() {

  return (
    <div className="App"> 
      <div id = 'gameboard'>
        <Player />
        <Enemy />
      </div>
    </div>
  );
}

export default App;
