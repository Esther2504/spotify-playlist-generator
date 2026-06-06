import React, { useState } from 'react'
import styled from 'styled-components'
import ArtistPlaylist from './playlisttools/ArtistPlaylist.tsx'
import { NavLink } from 'react-router'

export default function PlaylistOptions() {
  const [tool, setTool] = useState<string>()
  const [step, setStep] = useState<number>(1)

  return (
    <Container>
        <OptionsContainer>
          <NavLink to="../playlist/artistplaylist"><Option>Create separate playlist per artist</Option>
          </NavLink>
          <NavLink to="../playlist/yearplaylist"><Option>Create separate playlist per year</Option></NavLink>
          <NavLink to="../playlist/deduplicateplaylist"><Option>Remove duplicates</Option></NavLink>
          <NavLink to="../playlist/removeartist"><Option>Remove artist from your playlist</Option></NavLink>
          <Option>Shuffle playlist</Option>
          <Option>Remove explicit songs</Option>
          <Option>Create new playlist based on popularity</Option>
          <Option>Remove multiple playlist items at the same time</Option>
          <Option>Move songs between playlists</Option>
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

a {
text-decoration: none;
}
`

const Option = styled.div`
width: 150px;
height: 150px;
padding: 15px;
display: flex;
text-align: center;
align-items: center;
justify-content: center;
background: var(--green);
color: #fff;
border-radius: 15px;
font-weight: 500;
border: 2px solid transparent;
font-size: 1.1rem;
cursor: pointer;

&:hover {
border: 2px solid #fff;
}
`