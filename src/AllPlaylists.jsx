import React, { useState } from 'react'
import styled from 'styled-components'
import PlaylistOptions from './PlaylistOptions'

export default function AllPlaylists({ data, accessToken }) {
  const [playlistid, setPlaylistid] = useState()

  console.log(data)

  function choosePlaylist(playlist) {
    console.log(playlist.id)
    setPlaylistid(playlist.id)
  }

  return (
    <>
      {!playlistid ?
        <Container>
          <h1>Choose a playlist</h1>
          <PlaylistContainer>
            {data.items.map((playlist) =>
              <Playlist onClick={() => choosePlaylist(playlist)}>
                {/* <img src={playlist.images[0].url}></img> */}
                <p>{playlist.name}</p>
              </Playlist>
            )}
          </PlaylistContainer>
          <h2>Or use a public playlist</h2>
          <input></input>
        </Container>
        :
        <PlaylistOptions playlistid={playlistid} accessToken={accessToken} />
      }
    </>
  )
}

const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const PlaylistContainer = styled.div`
display: flex;
justify-items: space-around;
flex-wrap: wrap;
gap: 30px;
width: 1200px;
max-width: 100%;
`

const Playlist = styled.div`
width: 150px;
background-color: #148255;
padding: 20px;
font-size: 1rem;
cursor: pointer;
`

const Image = styled.img`
width: 120px;
`