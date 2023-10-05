import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import NewPlaylist from './NewPlaylist'

export default function Playlist({ playlistid, playlistName, accessToken }) {
  const [tracks, setTracks] = useState()
  const [songType, setSongType] = useState()

  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20playlist-read-private`

  if (playlistid && !tracks) {
    axios
      .get(`https://api.spotify.com/v1/playlists/${playlistid}/tracks`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        console.log(res.data)
        setTracks(res.data)
      })
      .catch((err) => {
        console.log(err.response)
      })

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
            <P onClick={() => setSongType("happiest")}>...happiest songs</P>
            <P onClick={() => setSongType("saddest")}>...saddest songs</P>
            <P onClick={() => setSongType("acccoustic")}>...accoustic songs</P>
            <P onClick={() => setSongType("energetic")}>...energetic songs</P>
            {/* <P onClick={() => setSongType("instrumental")}>...instrumental songs</P> */}
            <P onClick={() => setSongType("live")}>...live songs</P>
            <P onClick={() => setSongType("major")}>...songs in major key</P>
            <P onClick={() => setSongType("minor")}>...songs in minor key</P>
            <P onClick={() => setSongType("danceable")}>...most danceable songs</P>
            <P onClick={() => setSongType("fastest")}>...fastest songs</P>
            <P onClick={() => setSongType("slowest")}>...slowest songs</P>
          </div>
        </Container>
        :
        <NewPlaylist tracks={tracks.items} songType={songType} playlistName={playlistName} accessToken={accessToken} />
      }

      {/* {tracks ? <>
                      {tracks.items.map((track) =>
                        <P>{track.track.name}</P>
                    )}  
    </>
    :
    null} */}
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