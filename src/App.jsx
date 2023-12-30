import React, { useEffect, useState } from 'react';
import './App.css';
import AllPlaylists from './playlist-creator/AllPlaylists';
import StartPage from './playlist-creator/StartPage';
import { getPlaylists } from './playlist-creator/APICalls';
import StartPage2 from './song-suggestions/StartPage';
import Start from './song-suggestions/Start';
import styled from 'styled-components';

function App() {
  const [data, setData] = useState()
  const [accessToken, setAccessToken] = useState()
  const [accessToken2, setAccessToken2] = useState()
  const [currentStep, setCurrentStep] = useState(1);
  const [tool, setTool] = useState()
  const [step, setStep] = useState(1)

  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&grant_type=refresh_token&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20playlist-read-private%20playlist-modify-public%20playlist-modify-private`

  const getAccessToken = window.location.hash.substring(14).split('&')[0]

  useEffect(() => {
    if (window.location.hash.includes("access_token")) {
      setAccessToken(getAccessToken)
    }
  }, [window.location])

  console.log(accessToken)
  console.log(tool)

  useEffect(() => {
    if (accessToken && !data) {
      getPlaylists(getAccessToken, setData, data, setCurrentStep, currentStep, accessToken)
    }
  }, [accessToken])

  // function setToolHandler(chosentool) {
  //   console.log(chosentool)


  //     window.location.href = AUTH_URL
   
  //     // console.log(chosentool)

  //   // if (window.location.href == AUTH_URL) {
  //     setTool(chosentool)
  //   // }
    
  // }

  // useEffect(() => {
  //   console.log(tool)
  //   if (accessToken) {
  //     setStep(2)
  //     setTool(tool)
  //   }
  // }, [accessToken])

  useEffect(() => {
    console.log(tool)
    console.log(step)
    if (tool) {
      setStep(2)
      setTool(tool)
      
    }
  }, [tool])

  return (
    <div className="App">
      <Nav>
        <a>Playlist mixer</a>
        <a>Song suggestor</a>
      </Nav>
      <header className="App-header">
        {accessToken ? <>
        {tool == 'playlistmixer' ?
        // <StartPage AUTH_URL={AUTH_URL} />
        <AllPlaylists AUTH_URL={AUTH_URL} data={data} />
        : tool == 'songsuggestions' ?
          <Start accessToken={accessToken} step={step} setStep={setStep} />
          :
          <>
            {/* <A onClick={() => setTool('songsuggestions')} href={AUTH_URL}> */}
            <StartPage setTool={setTool} />
            <StartPage2 setTool={setTool} setStep={setStep} />
              {/* <button onClick={() => setTool('playlistmixer')}>Choose</button>
              <button onClick={() => setTool('songsuggestions')}>Choose</button> */}
            {/* </A> */}
          </>
      }
      </>
      :
      <A href={AUTH_URL}>Authorize</A>
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

const A = styled.a``

export default App;
