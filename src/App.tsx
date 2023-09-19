import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [value, setValue] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

useEffect(() => {
  var authOptions = {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials&client_id=' + process.env.REACT_APP_CLIENT_ID + '&client_secret=' + process.env.REACT_APP_CLIENT_SECRET
  };

fetch('https://accounts.spotify.com/api/token', authOptions)
.then(res => res.json())
.then(data => console.log(data))
}, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify playlist generator</h1>
        <button>Use your own playlist</button>
        <button>Use a public playlist</button>
      </header>
    </div>
  );
}

export default App;
