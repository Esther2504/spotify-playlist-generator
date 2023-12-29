import React from 'react'
import styled from 'styled-components'

export default function Playlist({newPlaylist, startOver}) {
  return (
       <Container>
          <TextContainer>
            <H1>Your playlist was created!</H1>
            <P>We already saved the playlist to your Spotify. Want to create another playlist?</P>
            <Button onClick={() => startOver()}>Create new playlist</Button>
          </TextContainer>
        <Iframe src={`https://open.spotify.com/embed/playlist/${newPlaylist.id}`} width="500" height="652" frameBorder="0" allowfullscreen="yes" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></Iframe>
    </Container>
  )
}



const Iframe = styled.iframe``

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
padding: 15px;
font-size: 1.2rem;
cursor: pointer;
`

const H1 = styled.h1``
const P = styled.p``