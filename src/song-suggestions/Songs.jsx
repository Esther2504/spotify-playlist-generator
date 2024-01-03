import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { searchSong } from './APICalls'
import cross from '../images/cross.svg'
import EmptyPlaylist from '../images/EmptyPlaylist.PNG'

export default function FaveSongs({getAccessToken, chosenSong, setChosenSong, setStep, setError}) {
  const [border, setBorder] = useState()
  const [song, setSong] = useState([])
  const [songSuggestions, setSongSuggestions] = useState()

  function getSongSuggestions(value) {
    setSong(value)
    if (value.length > 1) {
      searchSong(getAccessToken, song, setSongSuggestions, setError)
    }
  }

function setSongs(suggestion) { 
    setChosenSong(suggestion)
}

useEffect(() => {
if (song.length > 1) {
  setBorder(true)
} else {
  setBorder(false)
}
}, [song])

  return (
    <MainContainer>
    <H2>What is your favorite song?</H2>
    <Container>
    <Label>
    <TextInput border={border} type="text" value={song} onChange={(e) => getSongSuggestions(e.target.value)} />
    {songSuggestions && song.length > 1 ?
      <Suggestions>
        {songSuggestions.map((suggestion) => <Suggestion onClick={(e) => {setSongs(suggestion); setSong("")}}><AlbumSugImg src={suggestion.album.images[0].url} />{suggestion.name} - {suggestion.artists[0].name}</Suggestion>)}
      </Suggestions>
      : null
    }
      </Label>
    <SongContainer>
      {chosenSong ?
          <Song>
          {chosenSong.album.images[0] ? <AlbumImg src={chosenSong.album.images[0].url} /> : <AlbumImg src={EmptyPlaylist} />} 
            <AlbumImg src={chosenSong.album.images[0].url} />
          <SongName><span>{chosenSong.name}</span><span>{chosenSong.artists[0].name}</span></SongName><Cross src={cross} onClick={(e) => setChosenSong()} /></Song>
        : <P>Your chosen song will appear here. You can also continue without choosing a song, just go to the next step.</P>
      }
    </SongContainer>
    </Container>
    <ButtonContainer>
    <Button onClick={() => setStep(2)}>Previous</Button>
    <Button onClick={() => setStep(4)}>Next</Button>
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
height: auto;
`
const P = styled.p`
margin-top: 0;
text-align: left;

@media screen and (max-width: 850px) {
  text-align: center;
  padding: 10px;
}
`
const TextInput = styled.input`
width: 450px;
max-width: 95%;
height: 40px;
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
const AlbumSugImg = styled.img`
width: 50px;
height: 50px;
margin-right: 15px;
border-radius: 15px;
`
const Song = styled.div`
width: 354px;
height: 354px;
display: flex;
flex-direction: column;
position: relative;
border-radius: 15px;
border: 3px solid #148255;
overflow: hidden;
margin-top: 0;

@media screen and (max-width: 450px) {
  width: 300px;
  height: 300px;
}
`
const SongName = styled.div`
position: relative;
left: 0;
top: 275px;
width: 354px;
height: auto;
padding: 5px;
font-size: 1rem;
background-color: #148255;
border-top: 2px solid #fff;
border-bottom: 2px solid #fff;
display: flex;
flex-direction: column;
text-align: center;

@media screen and (max-width: 450px) {
  width: 300px;
  top: 220px;
}
`
const AlbumImg = styled.img`
width: 350px;
height: 350px;
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
top: -40px;
left: 310px;

@media screen and (max-width: 450px) {
  top: -45px;
  left: 260px;
}
`
const ButtonContainer = styled.div`
width: 95%;
max-width: 850px;
margin: 0 auto;
display: flex;
justify-content: space-between;
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
const H2 = styled.h2``
const SongContainer = styled.div``