import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


function App() {
  const [data, setData] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [accessToken, setAccessToken] = useState()

  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20playlist-read-private`

// useEffect(() => {
//   var authOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type' : 'application/x-www-form-urlencoded'
//     },
//     body: 'grant_type=client_credentials&client_id=' + process.env.REACT_APP_CLIENT_ID + '&client_secret=' + process.env.REACT_APP_CLIENT_SECRET
//   };

// fetch('https://accounts.spotify.com/api/token', authOptions)
// .then(res => res.json())
// .then(data => setAccessToken(data.access_token))
// }, [])

const getAccessToken = window.location.hash.substring(14).split('&')[0]

const getPlaylists = () => {
axios
.get('https://api.spotify.com/v1/me/playlists/', {
  headers: {
    Authorization: "Bearer " + getAccessToken,
  },
})
.then((res) => {
  setData(res.data)
  console.log(data)
})
.catch((err) => {
  console.log(err.response)
})
}

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify playlist generator</h1>
        <a href={AUTH_URL}><button>Use your own playlist</button></a>
        <button onClick={() => getPlaylists()}>Use a public playlist</button>
      </header>
    </div>
  );
}

export default App;
