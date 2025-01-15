import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { searchArtist } from './APICalls'
import cross from '../images/cross.svg'
import EmptyPlaylist from '../images/EmptyPlaylist.PNG'

export default function FaveArtists({ getAccessToken, chosenArtist, setChosenArtist, setStep, setError }) {
  const [border, setBorder] = useState(false)
  const [artist, setArtist] = useState([])
  const [artistSuggestions, setArtistSuggestions] = useState()

  function getArtistSuggestions(value) {
    setArtist(value)
    if (value.length > 1) {
      searchArtist(getAccessToken, artist, setArtistSuggestions, setError)
    }
  }

  function setArtists(suggestion) {
    setChosenArtist(suggestion)
  }

  useEffect(() => {
    if (artist.length > 1) {
      setBorder(true)
    } else {
      setBorder(false)
    }
  }, [artist])

  return (
    <MainContainer>
      <H2>Who is your favorite artist?</H2>
      <Container>
        <Label>
          <TextInput border={border} type="text" value={artist} onChange={(e) => getArtistSuggestions(e.target.value)} />
          {artistSuggestions && artist.length > 1 ?
            <Suggestions>
              {artistSuggestions.map((suggestion) => <Suggestion onClick={(e) => { setArtists(suggestion); setArtist("") }}>
                {suggestion.images[0] ? <ArtistSugImg src={suggestion.images[0].url} /> : <ArtistSugImg src={EmptyPlaylist} />}
                {suggestion.name}</Suggestion>)}
            </Suggestions>
            : null
          }
        </Label>
        <ArtistContainer>
          {chosenArtist ?
            <Artist><ArtistImg src={chosenArtist.images[0].url} /><ArtistName>{chosenArtist.name}</ArtistName><Cross src={cross} onClick={(e) => setChosenArtist()} /></Artist>
            : <P>Your chosen artist will appear here. You can also continue without choosing an artist, just click on next step.</P>
          }
        </ArtistContainer>
      </Container>
      <ButtonContainer>
        <DIV />
        <Button onClick={() => setStep(3)}>Next</Button>
      </ButtonContainer>
    </MainContainer>
  )
}

const MainContainer = styled.div`
max-width: 800px;
`
const Container = styled.div`
display: grid;
width: 100%;
min-height: 400px;
max-width: 850px;
align-items: flex-start;
grid-template-columns: 1fr 1fr;

@media screen and (max-width: 850px) {
  grid-template-columns: 1fr;
  grid-template-rows: 50px 1fr;
  justify-items: center;
}
`
const Label = styled.label`
display: flex;
flex-direction: column;
justify-content: start;
min-height: 400px;
`
const TextInput = styled.input`
width: 450px;
height: 40px;
max-width: 95%;
font-size: 1rem;
border: 2px solid #148255;
border-color: ${props => props.border ? "#148255 #148255 white" : "2px"};
border-radius: ${props => props.border ? "10px 10px 0 0" : "10px"};
padding: 0 10px;
outline: none;

@media screen and (max-width: 450px) {
  width: 300px;
}
`
const Suggestions = styled.div`
border: 2px solid #148255;
width: 450px;
max-width: 95%;
padding: 0 10px;
text-align: left;
font-size: 0.9rem;
border-radius: 0 0 10px 10px;
border-top: none;
z-index: 2;
background: #2C2C2C;

@media screen and (max-width: 450px) {
  width: 300px;
}
`
const Suggestion = styled.p`
cursor: pointer;
display: flex;
align-items: center;
`
const ArtistSugImg = styled.img`
width: 50px;
margin-right: 15px;
border-radius: 15px;
`
const Artist = styled.div`
width: 354px;
height: 354px;
display: flex;
flex-direction: column;
position: relative;
border-radius: 15px;
border: 3px solid #148255;
overflow: hidden;

@media screen and (max-width: 450px) {
  width: 300px;
  height: 300px;
}
`
const ArtistName = styled.p`
position: relative;
left: 0;
top: 275px;
width: 350px;
height: auto;
font-size: 1.3rem;
padding: 5px;
background-color: #148255;
border-top: 2px solid #fff;
border-bottom: 2px solid #fff;

@media screen and (max-width: 450px) {
  width: 300px;
  top: 200px;
}
`
const ArtistImg = styled.img`
width: 350px;
position: absolute;

@media screen and (max-width: 450px) {
  width: 300px;
}
`
const Cross = styled.img`
width: 25px;
height: 25px;
cursor: pointer;
position: relative;
top: -70px;
left: 310px;

@media screen and (max-width: 450px) {
  top: -70px;
left: 260px;
}
`
const P = styled.p`
margin-top: 0;
text-align: left;

@media screen and (max-width: 850px) {
  text-align: center;
}
`
const ButtonContainer = styled.div`
width: 95%;
max-width: 850px;
margin: 0 auto;
display: flex;
justify-content: space-between;
margin-bottom: 20px;
`
const Button = styled.button`
background: #148255;
border: none;
color: #fff;
padding: 15px;
font-size: 1rem;
cursor: pointer;
margin-top: 20px;
font-weight: 600;
`
const ArtistContainer = styled.div``
const H2 = styled.h2``
const DIV = styled.div``