import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import NewPlaylist from './NewPlaylist'
import { getTracks } from './APICalls'

export default function PlaylistOptions({ playlistid, playlistName, accessToken, currentStep, setCurrentStep }) {
  const [tracks, setTracks] = useState()
  const [songType, setSongType] = useState()

  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20playlist-read-private`

  if (playlistid && !tracks) {
    getTracks(playlistid, playlistName, accessToken, setTracks, songType, currentStep, setCurrentStep)
  }

  console.log(songType)




  return (
    <>
      {!songType ?
        <Container>
          <h1>Create a new playlist with the...</h1>
          <div />
          <div />
          <div>
            <P onClick={() => setSongType("Happiest")}>...happiest songs</P>
            <P onClick={() => setSongType("Saddest")}>...saddest songs</P>
            <P onClick={() => setSongType("Acccoustic")}>...accoustic songs</P>
            <P onClick={() => setSongType("Energetic")}>...energetic songs</P>
            {/* <P onClick={() => setSongType("instrumental")}>...instrumental songs</P> */}
            <P onClick={() => setSongType("Live")}>...live songs</P>
            <P onClick={() => setSongType("Major")}>...songs in major key</P>
            <P onClick={() => setSongType("Minor")}>...songs in minor key</P>
            <P onClick={() => setSongType("Danceable")}>...most danceable songs</P>
            <P onClick={() => setSongType("Fastest")}>...fastest songs</P>
            <P onClick={() => setSongType("Slowest")}>...slowest songs</P>
          </div>
        </Container>
         :
        <NewPlaylist tracks={tracks.items} songType={songType} playlistName={playlistName} accessToken={accessToken} />
      }
    </>
  )
}

const Container = styled.div`
width: 90%;
display: grid;
grid-template-columns: 1fr 1fr;
`

const P = styled.p`
cursor: pointer;

&:hover {
  color: #148255;
}
`

const Radio = styled.input`
list-type: none;
`