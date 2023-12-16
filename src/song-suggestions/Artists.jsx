import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getGenres, searchSong, searchArtist } from './APICalls'
import cross from '../images/cross.svg'

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
  console.log(chosenArtists.length)
  if (chosenArtists.length < 5 && chosenArtists.find((song) => song.id == suggestion.id) == undefined) {
    setChosenArtists([...chosenArtists, suggestion])
  } 
}

useEffect(() => {
if (artist.length > 1) {
  setBorder(true)
} else {
  setBorder(false)
}
}, [artist])

  return (
    <>
        <h2>Who are your favorite artists?</h2>
    <Container>
    <Label>     
    <TextInput border={border} type="text" value={artist} onChange={(e) => getArtistSuggestions(e.target.value)} />
    {artistSuggestions && artist.length > 1 ?
      <Suggestions>
        {artistSuggestions.map((suggestion) => <Suggestion onClick={(e) => {setArtists(suggestion); setArtist("")}}><ArtistImg src={suggestion.images[0].url} />{suggestion.name}</Suggestion>)}
      </Suggestions>
      : null
    }
      </Label>
    <ArtistContainer>
      {chosenArtists.length > 0 ?
        <Artists>
          {chosenArtists.map((suggestion) => <Artist><ArtistName><ArtistImg src={suggestion.images[0].url} />{suggestion.name}</ArtistName><Image src={cross} onClick={(e) => setChosenArtists(chosenArtists.filter(item => item !== suggestion))} /></Artist>)}
        </Artists>
        : <P>Your chosen artists will appear here. You can also continue without choosing an artist, just click on next step.</P>
      }
    </ArtistContainer>
    </Container>
    <SmallButton onClick={() => setStep(3)}>Next step</SmallButton>
    </>
  )
}

const Container = styled.div`
display: grid;
gap: 50px;
width: 100%;
max-width: 1500px;
align-items: flex-start;
grid-template-columns: 1fr 2fr;
`

const ArtistContainer = styled.div`
text-align: left;
`

const SmallButton = styled.button`
background: #148255;
border: none;
color: #fff;
padding: 15px;
font-size: 1rem;
cursor: pointer;
margin-top: 20px;
`

const ArtistName = styled.div`
display: flex;
align-items: center;
`

const TextInput = styled.input`
width: 500px;
height: 40px;
font-size: 1rem;
border: 2px solid #148255;
border-color: ${props => props.border ? "#148255 #148255 white" : "2px"};
border-radius: ${props => props.border ? "10px 10px 0 0" : "10px"};
padding: 0 10px;
outline: none;
`

const Suggestions = styled.div`
border: 2px solid #148255;
width: 500px;
padding: 0 10px;
text-align: left;
font-size: 0.9rem;
border-radius: 0 0 10px 10px;
border-top: none;
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
`

const Artist = styled.p`
width: 400px;
display: flex;
justify-content: space-between;
align-items: center;
margin: 10px 50px 10px 0;
`

const ArtistImg = styled.img`
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
width: 15px;
cursor: pointer;
`

const P = styled.p`
margin-top: 0;
`