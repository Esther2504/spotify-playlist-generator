import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getGenres, searchSong, searchArtist } from './APICalls'
import cross from '../images/cross.svg'
import EmptyPlaylist from '../images/EmptyPlaylist.PNG'

export default function FaveArtists({getAccessToken, song, chosenArtists, setChosenArtists, setStep}) {
  const [border, setBorder] = useState(false)
  const [artist, setArtist] = useState([])
  const [artistSuggestions, setArtistSuggestions] = useState()

  function getArtistSuggestions(value) {
    setArtist(value)
    if (value.length > 1) {
      searchArtist(getAccessToken, artist, setArtistSuggestions)
    }
  }

function setArtists(suggestion) {
    setChosenArtists(suggestion)
}

useEffect(() => {
if (artist.length > 1) {
  setBorder(true)
} else {
  setBorder(false)
}
}, [artist])

console.log(artistSuggestions)

  return (
    <ContainerContainer>
      <h2>Who is your favorite artist?</h2>
    <Container>
    <Label>     
    <TextInput border={border} type="text" value={artist} onChange={(e) => getArtistSuggestions(e.target.value)} />
    {artistSuggestions && artist.length > 1 ?
      <Suggestions>
        {artistSuggestions.map((suggestion) => <Suggestion onClick={(e) => {setArtists(suggestion); setArtist("")}}>
          {suggestion.images[0] ? <ArtistSugImg src={suggestion.images[0].url} /> : <ArtistSugImg src={EmptyPlaylist} />} 
          {suggestion.name}</Suggestion>)}
      </Suggestions>
      : null
    }
      </Label>
    <ArtistContainer>
      {chosenArtists ?
        // <Artists>
          <Artist><ArtistImg src={chosenArtists.images[0].url} /><ArtistName>{chosenArtists.name}</ArtistName><Image src={cross} onClick={(e) => setChosenArtists()} /></Artist>
        // </Artists>
        : <P>Your chosen artist will appear here. You can also continue without choosing an artist, just click on next step.</P>
      }
    </ArtistContainer>
    </Container>
    <ButtonContainer>
      <div />
    <SmallButton onClick={() => setStep(3)}>Next</SmallButton>
    </ButtonContainer>
    </ContainerContainer>
  )
}

const ContainerContainer = styled.div`
max-width: 800px;
`

const Container = styled.div`
display: grid;
width: 100%;
min-height: 500px;
max-width: 850px;
align-items: flex-start;
grid-template-columns: 1fr 1fr;
// margin: 0 auto;

@media screen and (max-width: 850px) {
  grid-template-columns: 1fr;
  grid-template-rows: 50px 1fr;
  justify-items: center;
}
`

const ButtonContainer = styled.div`
width: 95%;
max-width: 850px;
margin: 0 auto;
display: flex;
justify-content: space-between;
`

const ArtistContainer = styled.div`
// text-align: left;
`

const SmallButton = styled.button`
background: #148255;
border: none;
color: #fff;
padding: 15px;
font-size: 1rem;
cursor: pointer;
margin-top: 20px;
font-weight: 600;
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
background: #333333;

@media screen and (max-width: 450px) {
  width: 300px;
}
`

const Suggestion = styled.p`
cursor: pointer;
display: flex;
align-items: center;
`

const Artists = styled.div`
display: flex;
flex-direction: column;
height: 400px;
flex-wrap: wrap;
align-items: end;
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

const ArtistImg = styled.img`
width: 350px;
// border-radius: 15px;
position: absolute;

@media screen and (max-width: 450px) {
  width: 300px;
}
`

const ArtistSugImg = styled.img`
width: 50px;
margin-right: 15px;
border-radius: 15px;
`

const Label = styled.label`
display: flex;
flex-direction: column;
justify-content: start;
height: 500px;
`

const Image = styled.img`
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