import React from 'react'
import styled from 'styled-components'

export default function StartPage({ setTool }) {
  return (
    <Container>
        <H1>
          <Span>Spotify</Span>
          <BR />Playlist
          <BR />Mixer
        </H1>
        <P>Create playlists from existing playlists based on your preferences</P>
          <Button onClick={() => {setTool('playlistmixer')}}>Choose a playlist</Button>
    </Container>
  )
}

const Container = styled.div`
display: flex;
flex-direction: column;
width: 500px;
max-width: 50%;
// margin: 0 auto;
padding: 40px;
text-align: left;

@media screen and (max-width: 850px) {
  max-width: 100%;
  }
`
const Span = styled.span`
color: #148255;
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
const SVG = styled.svg`
@media screen and (max-width: 500px) {
    display: none;
}`
const Text = styled.div``
const H1 = styled.h1``
const P = styled.p``
const A = styled.a``
const BR = styled.br``