import React from 'react'
import styled from 'styled-components'

export default function PlaylistNameDescription({ setPlaylistName, setPlaylistDescription, setStep }) {
    return (
        <Container>
            <H2>Give your playlist a name and description</H2>
            <TextInput type="text" placeholder="Name" maxLength="100" onChange={(e) => setPlaylistName(e.target.value)} />
            <TextArea placeholder="Description" maxLength="300" onChange={(e) => setPlaylistDescription(e.target.value)} />
            <Button onClick={() => setStep(7)}>Get recommendations</Button>
        </Container>
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 20px;
width: 100%;
max-width: 850px;

@media screen and (max-width: 850px) {
    width: 750px;
   }
   @media screen and (max-width: 750px) {
    width: 650px;
   }
   @media screen and (max-width: 650px) {
    width: 550px;
   }
   @media screen and (max-width: 550px) {
    width: 450px;
   }
   @media screen and (max-width: 450px) {
    width: 350px;
   }
`

const TextInput = styled.input`
width: 800px;
max-width: 95%;
height: 40px;
font-size: 1rem;
border: 2px solid #148255;
border-radius: 10px;
padding: 0 10px;
outline: none;
`
const TextArea = styled.textarea`
width: 800px;
height: 100px;
font-size: 1rem;
border: 2px solid #148255;
border-radius: 10px;
padding: 10px;
outline: none;
max-width: 95%;
`
const Button = styled.button`
background: #148255;
border: none;
color: #fff;
padding: 15px;
font-size: 1rem;
cursor: pointer;
font-weight: 600;
width: 50%;
margin-top: 20px;
`
const H2 = styled.h2``