import React, { useState } from 'react'
import styled from 'styled-components'
import ArtistPlaylist from './ArtistPlaylist.tsx'

export default function PlaylistOptions({ setPlaylistTool, playlistTool }) {
  const [tool, setTool] = useState<string>()
  const [step, setStep] = useState<number>(1)

  return (
    <Container>
        <OptionsContainer>
          <Option onClick={() => setPlaylistTool("ArtistPlaylist")} selected={playlistTool == "ArtistPlaylist"}>Create separate playlist per artist</Option>
          <Option>Create separate playlist per year</Option>
          <Option>Remove duplicates</Option>
          <Option>Remove artist from your playlist</Option>
          <Option>Shuffle playlist</Option>
          <Option>Remove explicit songs</Option>
          <Option>Create new playlist based on popularity</Option>
          <Option>Remove multiple playlist items at the same time</Option>
        </OptionsContainer>
    </Container>
  )
}

const Container = styled.div`
max-width: 1400px;
width: 90%;
margin: 0 auto;

.login-btn {
background: #148255;
color: #fff;
padding: 10px 20px;
text-decoration: none;
border-radius: 20px;
width: fit-content;
}

h1 {
margin: 20px 0;
}
`

const OptionsContainer = styled.div`
display: flex;
flex-wrap: wrap;
gap: 20px;
width: 100%;
`

const Option = styled.div<{ $selected?: boolean; }>`
width: 150px;
height: 150px;
padding: 20px;
text-align: center;
vertical-align: middle;
background: var(--green);
color: #fff;
border-radius: 15px;

${props =>
    props.$selected && css`
      border: 1px solid #fff;
    `};
`