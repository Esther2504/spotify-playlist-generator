import React, { useEffect, useState } from 'react';
import './App.css';
import AllPlaylists from './playlist-creator/AllPlaylists';
import StartPage from './playlist-creator/StartPage';
import { getPlaylists } from './playlist-creator/APICalls';
import Start from './song-suggestions/Start';

function App() {
  const [data, setData] = useState()
  const [accessToken, setAccessToken] = useState()
  const [currentStep, setCurrentStep] = useState(1);

  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=https://esther2504.github.io/spotify-playlist-generator/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20playlist-read-private%20playlist-modify-public%20playlist-modify-private`

  const getAccessToken = window.location.hash.substring(14).split('&')[0]

  useEffect(() => {
    if (window.location.hash.includes("access_token")) {
      setAccessToken(getAccessToken)
    }
  }, [window.location])

  useEffect(() => {
    if (accessToken && !data) {
      getPlaylists(getAccessToken, setData, data, setCurrentStep, currentStep, accessToken)
    }
  }, [accessToken])

  return (
    <div className="App">
      <nav>
        <a>Song suggestion tool</a>
      </nav>
      <header className="App-header">
        {/* {!data ? */}
          {/* // <StartPage AUTH_URL={AUTH_URL} /> */}
          <Start AUTH_URL={AUTH_URL} accessToken={getAccessToken} />
          {/* // : <AllPlaylists data={data} accessToken={getAccessToken} />} */}
      </header>
    </div>
  );
}

export default App;
