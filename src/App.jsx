import React, { useEffect, useState } from 'react';
import './App.css';
import AllPlaylists from './playlist-creator/AllPlaylists';
import StartPage from './playlist-creator/StartPage';
import { getPlaylists } from './playlist-creator/APICalls';
import Start from './song-suggestions/Start';
import styled from 'styled-components';

function App() {
  const [data, setData] = useState()
  const [accessToken, setAccessToken] = useState()
  const [currentStep, setCurrentStep] = useState(1);
  const [tool, setTool] = useState()

  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&grant_type=refresh_token&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20playlist-read-private%20playlist-modify-public%20playlist-modify-private`

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
      <Nav>
        <a>Playlist mixer</a>
        <a>Song suggestor</a>
      </Nav>
      <header className="App-header">
        {tool == 'playlistmixer' ?
        <StartPage AUTH_URL={AUTH_URL} />
      : tool == 'songsuggestions' ?
<Start AUTH_URL={AUTH_URL} />
      :
      <>
      <button onClick={() => setTool('playlistmixer')}>Choose</button>
      <button onClick={() => setTool('songsuggestions')}>Choose</button>
      </>
      }
        {/* {!data ? */}
          {/* <StartPage AUTH_URL={AUTH_URL} /> */}
           {/* <Start AUTH_URL={AUTH_URL} /> */}
         {/* : <AllPlaylists data={data} accessToken={getAccessToken} />} */}
      </header>
    </div>
  );
}

const Nav = styled.nav`
height: 50px;
border-bottom: 3px solid white;
`

export default App;
