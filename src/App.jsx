import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import AllPlaylists from './AllPlaylists';
import styled from 'styled-components';
import StartPage from './StartPage';
import { getPlaylists } from './APICalls';
import PlaylistOptions from './PlaylistOptions';

function App() {
  const [data, setData] = useState()
  const [accessToken, setAccessToken] = useState()
  const [currentStep, setCurrentStep] = useState(1);
  const [playlistid, setPlaylistid] = useState()
  const [playlistName, setPlaylistName] = useState()

  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20playlist-read-private%20playlist-modify-public%20playlist-modify-private`

  const getAccessToken = window.location.hash.substring(14).split('&')[0]

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };


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


  console.log(accessToken)
  console.log(data)

  return (
    <div className="App">
      <nav>
        {/* <ul>
<li>Create playlist</li>
        </ul> */}
      </nav>
      <header className="App-header">
         {(currentStep === 1 && !data) && <StartPage AUTH_URL={AUTH_URL} />}
         {currentStep === 2 && <AllPlaylists data={data} accessToken={getAccessToken} currentStep={currentStep} setCurrentStep={setCurrentStep} playlistid={playlistid} setPlaylistid={setPlaylistid} playlistName={playlistName} setPlaylistName={setPlaylistName} />}
         {currentStep === 3 && <PlaylistOptions accessToken={accessToken} />}
          {/* : <AllPlaylists data={data} accessToken={getAccessToken} />} */}
      </header>
    </div>
  );
}



export default App;
