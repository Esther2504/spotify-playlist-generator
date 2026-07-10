import React from 'react'
import { useState, useEffect } from 'react'
import PlaylistOptions from './PlaylistOptions.tsx'
import { NavLink } from 'react-router'
import styled from 'styled-components'

type Props = {}

export default function index({ }: Props) {
  // const [playlistTool, setPlaylistTool] = useState<string>()


  return (
    <Container>
      <h1>What <span>tool</span> do you want to use?</h1>
      <PlaylistOptions />
    </Container>
  )
}

const Container = styled.div`
margin: 40px auto;
display: flex;
flex-direction: column;
align-items: center;
gap: 50px;
padding: 20px;

h1 {
font-size: 2.6rem;
}
`