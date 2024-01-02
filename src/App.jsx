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
      {/* <Nav>
        <a>Playlist mixer</a>
        <a>Song suggestor</a>
      </Nav> */}
      <header className="App-header">
        {accessToken ? <>
        {tool == 'playlistmixer' ?
        // <StartPage AUTH_URL={AUTH_URL} />
        <AllPlaylists accessToken={accessToken} data={data} />
        : tool == 'songsuggestions' ?
          <Start accessToken={accessToken} step={step} setStep={setStep} />
          :
          <StartContainer>
            {/* <A onClick={() => setTool('songsuggestions')} href={AUTH_URL}> */}
            <StartPage setTool={setTool} />
            <StartPage2 setTool={setTool} setStep={setStep} />
              {/* <button onClick={() => setTool('playlistmixer')}>Choose</button>
              <button onClick={() => setTool('songsuggestions')}>Choose</button> */}
            {/* </A> */}
          </StartContainer>
      }
      </>
      :
      <Container>
      <SVG viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3276 7.54199H8.67239C5.29758 7.54199 3.61017 7.54199 2.66232 8.52882C1.71447 9.51565 1.93748 11.0403 2.38351 14.0895L2.80648 16.9811C3.15626 19.3723 3.33115 20.5679 4.22834 21.2839C5.12553 21.9999 6.4488 21.9999 9.09534 21.9999H14.9046C17.5512 21.9999 18.8745 21.9999 19.7717 21.2839C20.6689 20.5679 20.8437 19.3723 21.1935 16.9811L21.6165 14.0895C22.0625 11.0403 22.2855 9.51564 21.3377 8.52882C20.3898 7.54199 18.7024 7.54199 15.3276 7.54199ZM14.5885 10.165C13.3569 9.63883 11.9428 10.4304 11.8607 11.6924C11.8571 11.7475 11.8571 11.8163 11.8571 11.8993L11.8571 11.9262C11.8571 11.9558 11.8571 11.9822 11.8578 12.0077L11.8574 15.5219C11.4791 15.3176 11.0399 15.2007 10.5714 15.2007C9.15135 15.2007 8 16.275 8 17.6003C8 18.9257 9.15135 19.9999 10.5714 19.9999C11.9915 19.9999 13.1428 18.9256 13.1429 17.6003L13.1433 13.6814L14.0713 14.1432C14.1497 14.1823 14.2149 14.2147 14.2686 14.2377C15.5003 14.7639 16.9144 13.9723 16.9965 12.7103C17 12.6552 17 12.5864 17 12.5033L17 12.4766C17 12.4426 17 12.413 16.999 12.3841C16.9778 11.7606 16.6121 11.1919 16.0326 10.881C16.0057 10.8666 15.9777 10.8527 15.9456 10.8367L14.7858 10.2595C14.7074 10.2204 14.6423 10.188 14.5885 10.165Z" fill="#148255"></path> <path d="M14.0533 11.2561C13.6426 11.0806 13.1714 11.3446 13.144 11.7651C13.1432 11.7783 13.1429 11.8056 13.1429 11.919C13.1429 11.964 13.1429 11.9732 13.1432 11.9805C13.1503 12.1882 13.2721 12.3778 13.4653 12.4814C13.472 12.485 13.4807 12.4894 13.5232 12.5105L14.6576 13.0751C14.7649 13.1285 14.7909 13.1411 14.8038 13.1466C15.2145 13.3221 15.6858 13.0581 15.7131 12.6376C15.714 12.6244 15.7143 12.5971 15.7143 12.4836C15.7143 12.4387 15.7142 12.4295 15.714 12.4222C15.7069 12.2145 15.585 12.025 15.3919 11.9213L14.0533 11.2561Z" fill="#148255"></path> <path d="M10.5714 16.4006C11.2816 16.4006 11.8571 16.9378 11.8571 17.6003C11.8571 18.2628 11.2816 18.8 10.5714 18.8C9.86127 18.8 9.28571 18.2628 9.28571 17.6003C9.28571 16.9378 9.86127 16.4006 10.5714 16.4006Z" fill="#148255"></path> <path opacity="0.4" d="M8.51005 2.00001H15.4901C15.7226 1.99995 15.9009 1.99991 16.0567 2.01515C17.1645 2.12352 18.0712 2.78958 18.4558 3.68678H5.54443C5.92895 2.78958 6.8357 2.12352 7.94352 2.01515C8.09933 1.99991 8.27757 1.99995 8.51005 2.00001Z" fill="#148255"></path> <path opacity="0.7" d="M6.31069 4.72266C4.92007 4.72266 3.7798 5.56241 3.39927 6.67645C3.39134 6.69967 3.38374 6.72302 3.37646 6.74647C3.77461 6.6259 4.18898 6.54713 4.60845 6.49336C5.68882 6.35485 7.05416 6.35492 8.64019 6.35501H15.5323C17.1183 6.35492 18.4837 6.35485 19.564 6.49336C19.9835 6.54713 20.3979 6.6259 20.796 6.74647C20.7887 6.72302 20.7811 6.69967 20.7732 6.67645C20.3927 5.56241 19.2524 4.72266 17.8618 4.72266H6.31069Z" fill="#148255"></path> </g></SVG>
      <TextContainer>
      <h2>Welcome to the Spotify Playlist Generator</h2>
      <p>Connect to Spotify and unlock a world of personalized music experiences. Whether you want to:</p>
      <ul>
        <li>Mix up playlists to fit your preferences</li>
        <li>Discover new music based on your favorite artist, song or genre</li>
      </ul>
      <h4>Why connect to Spotify?</h4>
      <p>Connecting allows us to access your playlists and add the created playlists to your Spotify.  We do not store or share any of your data.</p>
      <A href={AUTH_URL}>
        
        <Button>Connect to Spotify</Button>
        </A>
        </TextContainer>
        </Container>
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

const Container = styled.div`
display: flex;
text-align: left;
max-width: 95%;
`

const TextContainer = styled.div`
width: 700px;
font-size: 1.5rem;
`

const StartContainer = styled.div`
display: flex;
width: 1200px;
margin: 0 auto;
max-width: 100%;
justify-content: space-between;
`

const Button = styled.button`
background: #148255;
border: none;
color: #fff;
padding: 15px 30px;
font-size: 1.5rem;
cursor: pointer;
font-weight: 600;
`

const A = styled.a``

const SVG = styled.svg`
width: 600px;
`

export default App;
