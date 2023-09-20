import React from 'react'
import styled from 'styled-components'

export default function AllPlaylists( {data} ) {
  return (
    <Container>
    <h1>Choose a playlist</h1>
    <PlaylistContainer>
    {data.items.map((playlist) => 
        <Playlist>
          <IMG src={playlist.images[0].url}></IMG>
        <p>{playlist.name}</p>
        </Playlist>
        )}
</PlaylistContainer>
        <h2>Or use a public playlist</h2>
        <input></input>
        </Container>
  )
}

const Container = styled.div`
width: 100%;
`

const PlaylistContainer = styled.div`
width: 1300px;
margin: 0 auto;
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

const IMG = styled.img`
width: 120px;
`