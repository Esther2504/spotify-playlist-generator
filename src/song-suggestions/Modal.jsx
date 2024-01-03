import React from 'react'
import styled from 'styled-components'

export default function Modal({ setShowModal }) {
  return (
      <Container>
        <H1>Choose at least 1 song, artist or genre</H1>
        <Button onClick={() => setShowModal(false)}>Continue</Button>
      </Container>
  )
}

const Container = styled.div`
position: absolute;
z-index: 9;
width: 70%;
height: 300px;
background: #2C2C2C;
top: 0;
left: 15%;
border-radius: 15px;
font-size: 1.5rem;
padding: 20px;
border: 5px solid white;

@media screen and (max-width: 800px) {
  font-size: 1rem;
}
`
const IMG = styled.img`
width: 200px;
`
const Button = styled.button`
background: #148255;
border: none;
color: #fff;
padding: 15px 30px;
font-size: 1.5rem;
cursor: pointer;
font-weight: 600;
`
const H1 = styled.h1``
const BR = styled.br``