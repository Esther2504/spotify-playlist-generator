import React, { useState } from 'react'
import styled from 'styled-components'
import AllPlaylists from './AllPlaylists'

export default function PlaylistCreated({ newPlaylistID, data, accessToken }) {
  const [createNew, setCreateNew] = useState(false)

  return (
    <>
      {!createNew ?
        <Container>
          <TextContainer>
            <H1>Your playlist was created!</H1>
            <P>We already saved the playlist to your Spotify. Want to create another playlist?</P>
            <Button onClick={() => setCreateNew(true)}>Create new playlist</Button>
          </TextContainer>
          <Iframe src={`https://open.spotify.com/embed/playlist/${newPlaylistID}`} width="300" height="752" frameBorder="0" allowfullscreen="yes" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></Iframe>
        </Container>
        : <AllPlaylists data={data} accessToken={accessToken} />
      }
    </>
  )
}

const Container = styled.div`
display: flex;
text-align: left;
gap: 60px;
width: 90%;
max-width: 100%;
margin: 50px auto;

@media screen and (max-width: 1100px) {
  flex-direction: column;
}
`

const TextContainer = styled.div`
max-width: 100%;

@media screen and (max-width: 1100px) {
  max-width: 100%;
}
`

const Button = styled.button`
  background: #148255;
  border: none;
  color: #fff;
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
`

const Iframe = styled.iframe`
  width: 700px;
  max-width: 100%;

  @media screen and (max-width: 1100px) {
    width: 500px;
  }
`

const H1 = styled.h1``
const P = styled.p``