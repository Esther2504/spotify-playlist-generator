import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import NewPlaylist from './NewPlaylist'
import { getTracks } from './APICalls'

export default function PlaylistOptions({ playlistid, playlistName, setPlaylistName, data, accessToken }) {
  const [tracks, setTracks] = useState()
  const [songType, setSongType] = useState()

  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20playlist-read-private`

  if (playlistid && !tracks) {
    getTracks(playlistid, playlistName, setPlaylistName, accessToken, setTracks, songType)
  }

  console.log(songType)

  console.log(playlistName)




  return (
    <>
      {!songType ?
        <Container>
          <h1>Create a new playlist with the...</h1>
          <Options>
            <P onClick={() => setSongType("Happiest")}>...happiest songs</P>
            <P onClick={() => setSongType("Saddest")}>...saddest songs</P>
            <P onClick={() => setSongType("Accoustic")}>...accoustic songs</P>
            <P onClick={() => setSongType("Energetic")}>...energetic songs</P>
            {/* <P onClick={() => setSongType("instrumental")}>...instrumental songs</P> */}
            <P onClick={() => setSongType("Live")}>...live songs</P>
            <P onClick={() => setSongType("Major")}>...songs in major key</P>
            <P onClick={() => setSongType("Minor")}>...songs in minor key</P>
            <P onClick={() => setSongType("Danceable")}>...most danceable songs</P>
            <P onClick={() => setSongType("Fastest")}>...fastest songs</P>
            <P onClick={() => setSongType("Slowest")}>...slowest songs</P>
          </Options>
        </Container>
         :
        <NewPlaylist tracks={tracks.items} songType={songType} playlistName={playlistName} data={data} accessToken={accessToken} />
      }
    </>
  )
}

const Container = styled.div`
width: 90%;
display: grid;
grid-template-columns: 2fr 1fr;
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

const Radio = styled.input`
list-type: none;
`