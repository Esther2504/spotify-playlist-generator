import React, { useState } from 'react'
import styled from 'styled-components'
import NewPlaylist from './NewPlaylist'

export default function PlaylistOptions({ playlistid, playlistName, setPlaylistName, data, accessToken, tracks }) {
  const [songType, setSongType] = useState()

  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20playlist-read-private`

  return (
    <>
      {!songType ?
        <Container>
          {/* <h1>Create a new playlist with the...</h1> */}
          <h1>What kind of playlist do you want to create?</h1>
          <Options>
            {/* <P onClick={() => setSongType("Positive")}>...positive songs</P>
            <P onClick={() => setSongType("Sad")}>...sad songs</P>
            <P onClick={() => setSongType("Accoustic")}>...accoustic songs</P>
            <P onClick={() => setSongType("Energetic")}>...energetic songs</P>
            <P onClick={() => setSongType("instrumental")}>...instrumental songs</P>
            <P onClick={() => setSongType("Live")}>...live performed songs</P>
            <P onClick={() => setSongType("Major")}>...songs in major key</P>
            <P onClick={() => setSongType("Minor")}>...songs in minor key</P>
            <P onClick={() => setSongType("Danceable")}>...most danceable songs</P>
            <P onClick={() => setSongType("Fastest")}>...fastest songs</P>
            <P onClick={() => setSongType("Slowest")}>...slowest songs</P>
            <P onClick={() => setSongType("Loudest")}>...loudest songs</P> */}
            <Option>
            <SVG viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM9.375 10.5C9.99632 10.5 10.5 9.99632 10.5 9.375C10.5 8.75368 9.99632 8.25 9.375 8.25C8.75368 8.25 8.25 8.75368 8.25 9.375C8.25 9.99632 8.75368 10.5 9.375 10.5ZM15.75 9.375C15.75 9.99632 15.2463 10.5 14.625 10.5C14.0037 10.5 13.5 9.99632 13.5 9.375C13.5 8.75368 14.0037 8.25 14.625 8.25C15.2463 8.25 15.75 8.75368 15.75 9.375ZM12 15C10.1783 15 9 13.8451 9 12.75H7.5C7.5 14.9686 9.67954 16.5 12 16.5C14.3205 16.5 16.5 14.9686 16.5 12.75H15C15 13.8451 13.8217 15 12 15Z"></path> </g></SVG>
            <span>Positive vibes</span>
            </Option>
            <Option>
            <SVG viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM7.99979 13.7161C7.99979 14.5393 7.33239 15.2067 6.50911 15.2067C5.68583 15.2067 5.01843 14.5393 5.01843 13.7161C5.01843 12.8928 6.50911 10.7347 6.50911 10.7347C6.50911 10.7347 7.99979 12.8928 7.99979 13.7161ZM14.0333 17.2558C14.173 17.7836 14.7113 18.1027 15.2425 17.9699C15.7783 17.8359 16.1041 17.293 15.9701 16.7572C15.5311 15.0012 13.7167 13.9998 12 13.9998C10.2147 13.9998 8.54762 15.0116 8.02985 16.7597C7.8959 17.2955 8.22166 17.8359 8.75746 17.9699C9.28872 18.1027 9.827 17.7836 9.96665 17.2558C10.2278 16.3851 11.1602 15.9998 12 15.9998C12.8398 15.9998 13.7722 16.3851 14.0333 17.2558ZM10.5 10C10.5 10.8284 9.82843 11.5 9 11.5C8.17157 11.5 7.5 10.8284 7.5 10C7.5 9.17157 8.17157 8.5 9 8.5C9.82843 8.5 10.5 9.17157 10.5 10ZM15 11.5C15.8284 11.5 16.5 10.8284 16.5 10C16.5 9.17157 15.8284 8.5 15 8.5C14.1716 8.5 13.5 9.17157 13.5 10C13.5 10.8284 14.1716 11.5 15 11.5Z"></path> </g></SVG>
            <span>Sad vibes</span>
            </Option>
            <Option>
            <SVG viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM7.99979 13.7161C7.99979 14.5393 7.33239 15.2067 6.50911 15.2067C5.68583 15.2067 5.01843 14.5393 5.01843 13.7161C5.01843 12.8928 6.50911 10.7347 6.50911 10.7347C6.50911 10.7347 7.99979 12.8928 7.99979 13.7161ZM14.0333 17.2558C14.173 17.7836 14.7113 18.1027 15.2425 17.9699C15.7783 17.8359 16.1041 17.293 15.9701 16.7572C15.5311 15.0012 13.7167 13.9998 12 13.9998C10.2147 13.9998 8.54762 15.0116 8.02985 16.7597C7.8959 17.2955 8.22166 17.8359 8.75746 17.9699C9.28872 18.1027 9.827 17.7836 9.96665 17.2558C10.2278 16.3851 11.1602 15.9998 12 15.9998C12.8398 15.9998 13.7722 16.3851 14.0333 17.2558ZM10.5 10C10.5 10.8284 9.82843 11.5 9 11.5C8.17157 11.5 7.5 10.8284 7.5 10C7.5 9.17157 8.17157 8.5 9 8.5C9.82843 8.5 10.5 9.17157 10.5 10ZM15 11.5C15.8284 11.5 16.5 10.8284 16.5 10C16.5 9.17157 15.8284 8.5 15 8.5C14.1716 8.5 13.5 9.17157 13.5 10C13.5 10.8284 14.1716 11.5 15 11.5Z"></path> </g></SVG>
            <span>Sad vibes</span>
            </Option>
          </Options>
        </Container>
         :
        <NewPlaylist tracks={tracks.items} songType={songType} playlistName={playlistName} data={data} accessToken={accessToken} />
      }
    </>
  )
}

const Container = styled.div`
width: 100%;
display: grid;
grid-template-columns: 2fr 1.5fr;
`

const Options = styled.div`
margin-top: 150px;
`

const P = styled.p`
cursor: pointer;
text-align: left;

&:hover {
  color: #148255;
}
`

const Option = styled.div`
width: 180px;
height: 180px;
border: 1px solid white;
border-radius: 5px;
padding: 10px 20px;
cursor: pointer;

&:hover {
  border-color: #148255;
  color: #148255;
  
  svg {
    fill: #148255;
  }
  }
`

const SVG = styled.svg`
width: 80%;
fill: #ffffff;

&:hover {
fill: #148255;
}
`