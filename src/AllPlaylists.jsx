import React, { useState } from 'react'
import styled from 'styled-components'

export default function AllPlaylists({ data }) {
const [playlist, setPlaylist] = useState()

  console.log(data)

  function choosePlaylist(playlist) {
console.log(playlist.href)
setPlaylist(playlist.href)
  }

  return (
    <>
    {!playlist ?
      <Container>
      <h1>Choose a playlist</h1>
      <PlaylistContainer>
        {data.items.map((playlist) =>
          <Playlist onClick={() => choosePlaylist(playlist.tracks)}>
            <Image src={playlist.images[0].url}></Image>
            <p>{playlist.name}</p>
          </Playlist>
        )}
      </PlaylistContainer>
      <h2>Or use a public playlist</h2>
      <input></input>
    </Container>
      :
      null
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
`

const Playlist = styled.div`
width: 150px;
background-color: #148255;
padding: 20px;
font-size: 1rem;
`

const Image = styled.img`
width: 120px;
`