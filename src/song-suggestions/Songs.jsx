import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getGenres, searchSong, searchArtist } from './APICalls'
import cross from '../images/cross.svg'

export default function FaveSongs({getAccessToken, chosenSongs, setChosenSongs, setStep}) {
  const [border, setBorder] = useState()
  const [song, setSong] = useState([])
  const [songSuggestions, setSongSuggestions] = useState()

  function getSongSuggestions(value) {
    setSong(value)
    if (value.length > 1) {
      searchSong(getAccessToken, song, setSongSuggestions)
      console.log(songSuggestions)
    }
   
  }

function setSongs(suggestion) {
  if (chosenSongs.length < 10 && chosenSongs.find((song) => song.id == suggestion.id) == undefined) {
    setChosenSongs([...chosenSongs, suggestion])
  } else if (chosenSongs.find((song) => song.id == suggestion.id) != undefined) {
    alert("you've already chosen this song")
  } else if (chosenSongs.length > 10) {
    alert("you've chosen 10 songs, remove one if you want to add this song")
  }
}

useEffect(() => {
if (song.length > 1) {
  setBorder(true)
} else {
  setBorder(false)
}
}, [song])

  return (
    <>
    <h2>What are your favorite songs?</h2>
    <Container>
    <Label>     
    <TextInput border={border} type="text" value={song} onChange={(e) => getSongSuggestions(e.target.value)} />
    {songSuggestions && song.length > 1 ?
      <Suggestions>
        {songSuggestions.map((suggestion) => <Suggestion onClick={(e) => {setSongs(suggestion); setSong("")}}><AlbumImg src={suggestion.album.images[0].url} />{suggestion.name} - {suggestion.artists[0].name}</Suggestion>)}
      </Suggestions>
      : null
    }
      </Label>
    <ArtistContainer>
      {chosenSongs.length > 0 ?
        <Songs>
          {chosenSongs.map((suggestion) => <Song><AlbumImg src={suggestion.album.images[0].url} /><SongName><span>{suggestion.name}</span><span>{suggestion.artists[0].name}</span></SongName><Image src={cross} onClick={(e) => setChosenSongs(chosenSongs.filter(item => item.id !== suggestion.id))} /></Song>)}
        </Songs>
        : <P>Your chosen songs will appear here. You can also continue without choosing a song, just click on next step.</P>
      }
    </ArtistContainer>
    </Container>
    <SmallButton onClick={() => setStep(4)}>Next step</SmallButton>
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

const SongName = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
font-size: 1rem;
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

const Songs = styled.div`
display: flex;
flex-direction: column;
height: 400px;
flex-wrap: wrap;
`

const Song = styled.p`
width: 400px;
display: grid;
grid-template-columns: 50px 250px 50px;
align-items: center;
margin: 10px 50px 10px 0;
gap: 15px;
`

const AlbumImg = styled.img`
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